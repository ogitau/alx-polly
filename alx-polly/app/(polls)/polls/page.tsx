import { createClient } from '@/lib/supabase/server'

export default async function PollsListPage() {
  const supabase = await createClient()
  const { data: polls, error } = await supabase
    .from('polls')
    .select('id, question, created_at')
    .order('created_at', { ascending: false })
    .limit(30)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Polls</h1>
        <p className="text-sm text-muted-foreground">Browse and vote on community polls.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {error && (
          <div className="text-sm text-destructive">Failed to load polls.</div>
        )}
        {(polls ?? []).map((poll) => (
          <div key={poll.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
            <h2 className="font-medium line-clamp-2">{poll.question}</h2>
            <div className="flex items-center gap-2">
              <a href={`/polls/${poll.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground h-9 px-3">
                View poll
              </a>
              <a href={`/polls/${poll.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-9 px-3">
                Vote
              </a>
            </div>
          </div>
        ))}
        {(!error && (polls ?? []).length === 0) && (
          <div className="text-sm text-muted-foreground">No polls yet. Be the first to create one.</div>
        )}
      </div>
    </div>
  )
}


