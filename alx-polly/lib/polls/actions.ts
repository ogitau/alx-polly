'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPoll(formData: FormData) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/signin?error=You must be signed in to create a poll')
  }

  const question = formData.get('question') as string
  const options = formData.getAll('options') as string[]

  // Validate input
  if (!question || question.trim().length === 0) {
    redirect('/polls/new?error=Question is required')
  }

  if (options.length < 2) {
    redirect('/polls/new?error=At least two options are required')
  }

  // Filter out empty options
  const validOptions = options.filter(option => option.trim().length > 0)
  
  if (validOptions.length < 2) {
    redirect('/polls/new?error=At least two valid options are required')
  }

  try {
    // Create the poll
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({
        question: question.trim(),
        user_id: user.id,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (pollError) {
      console.error('Poll creation error:', pollError)
      redirect('/polls/new?error=Failed to create poll')
    }

    // Create the poll options
    const optionsData = validOptions.map((option, index) => ({
      poll_id: poll.id,
      text: option.trim(),
      order_index: index + 1
    }))

    const { error: optionsError } = await supabase
      .from('poll_options')
      .insert(optionsData)

    if (optionsError) {
      console.error('Options creation error:', optionsError)
      // Clean up the poll if options creation fails
      await supabase.from('polls').delete().eq('id', poll.id)
      redirect('/polls/new?error=Failed to create poll options')
    }

    revalidatePath('/polls')
    redirect(`/polls/${poll.id}`)
  } catch (error) {
    // Allow Next.js redirect to propagate
    const maybeDigest = (error as any)?.digest as string | undefined
    if (maybeDigest && maybeDigest.startsWith('NEXT_REDIRECT')) {
      throw error
    }
    console.error('Unexpected error:', error)
    redirect('/polls/new?error=An unexpected error occurred')
  }
}

export async function voteOnPoll(pollId: string, optionId: string) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect(`/polls/${pollId}?error=You must be signed in to vote`)
  }

  try {
    // Check if user has already voted on this poll
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('user_id', user.id)
      .single()

    if (existingVote) {
      redirect(`/polls/${pollId}?error=You have already voted on this poll`)
    }

    // Create the vote
    const { error: voteError } = await supabase
      .from('votes')
      .insert({
        poll_id: pollId,
        option_id: optionId,
        user_id: user.id,
        created_at: new Date().toISOString()
      })

    if (voteError) {
      console.error('Vote error:', voteError)
      redirect(`/polls/${pollId}?error=Failed to submit vote`)
    }

    revalidatePath(`/polls/${pollId}`)
    redirect(`/polls/${pollId}?success=Vote submitted successfully`)
  } catch (error) {
    console.error('Unexpected error:', error)
    redirect(`/polls/${pollId}?error=An unexpected error occurred`)
  }
}

export async function voteAction(formData: FormData) {
  'use server'
  const pollId = String(formData.get('poll_id') || '')
  const optionId = String(formData.get('option_id') || '')

  if (!pollId || !optionId) {
    redirect('/?error=Invalid vote payload')
  }

  await voteOnPoll(pollId, optionId)
}
