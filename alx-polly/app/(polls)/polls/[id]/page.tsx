type PollPageProps = {
  params: { id: string };
};

export default function PollDetailPage({ params }: PollPageProps) {
  const { id } = params;
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Poll #{id}</h1>
        <p className="text-sm text-muted-foreground">Placeholder poll question goes here.</p>
      </div>
      <div className="space-y-3">
        {["Option A", "Option B", "Option C"].map((label) => (
          <button key={label} className="w-full inline-flex items-center justify-between rounded-md border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground h-12 px-4">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-muted-foreground">0%</span>
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Sign in to vote and see results.</div>
    </div>
  );
}


