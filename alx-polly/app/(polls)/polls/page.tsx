export default function PollsListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Polls</h1>
        <p className="text-sm text-muted-foreground">Browse and vote on community polls.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((id) => (
          <div key={id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-2">
            <h2 className="font-medium">Sample poll #{id}</h2>
            <p className="text-sm text-muted-foreground">Short description of the poll question.</p>
            <a href={`/polls/${id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground h-9 px-3">
              View poll
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


