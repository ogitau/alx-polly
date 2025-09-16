import { createClient } from '@/lib/supabase/server'
import { voteAction } from '@/lib/polls/actions'

type PollPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PollDetailPage({ params }: PollPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .select('id, question')
    .eq('id', id)
    .single()

  const { data: options, error: optionsError } = await supabase
    .from('poll_options')
    .select('id, text')
    .eq('poll_id', id)
    .order('order_index', { ascending: true })

  // Fetch results (vote counts per option)
  const { data: votes } = await supabase
    .from('votes')
    .select('option_id')
    .eq('poll_id', id)

  const voteCounts = new Map<string, number>()
  for (const v of votes ?? []) {
    voteCounts.set(v.option_id as string, (voteCounts.get(v.option_id as string) || 0) + 1)
  }
  const totalVotes = Array.from(voteCounts.values()).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {pollError ? 'Poll not found' : poll?.question}
        </h1>
        <p className="text-sm text-muted-foreground">
          {pollError ? 'This poll does not exist.' : 'Choose an option to vote.'}
        </p>
      </div>
      <div className="space-y-3">
        {optionsError && (
          <div className="text-sm text-destructive">Failed to load options.</div>
        )}
        <form action={voteAction} className="space-y-2">
          <input type="hidden" name="poll_id" value={id} />
          {(options ?? []).map((opt) => {
            const count = voteCounts.get(opt.id) || 0
            const pct = totalVotes ? Math.round((count / totalVotes) * 100) : 0
            return (
              <button
                key={opt.id}
                name="option_id"
                value={opt.id}
                className="w-full inline-flex items-center justify-between rounded-md border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground h-12 px-4"
              >
                <span className="text-sm font-medium">{opt.text}</span>
                <span className="text-xs text-muted-foreground">{pct}%</span>
              </button>
            )
          })}
        </form>
      </div>
      {/* Vote distribution chart */}
      <div className="space-y-2">
        <div className="text-sm font-medium">Results</div>
        <div className="space-y-3">
          {(options ?? []).map((opt) => {
            const count = voteCounts.get(opt.id) || 0
            const pct = totalVotes ? Math.round((count / totalVotes) * 100) : 0
            return (
              <div key={opt.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground line-clamp-1">{opt.text}</span>
                  <span className="tabular-nums text-muted-foreground">{count} • {pct}%</span>
                </div>
                <div className="h-3 w-full rounded bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary/80"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="text-xs text-muted-foreground">Total votes: {totalVotes}</div>
      </div>
      <div className="text-xs text-muted-foreground">Sign in to vote. Results update after voting.</div>
    </div>
  )
}


