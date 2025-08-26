export default function NewPollPage() {
  return (
    <div className="mx-auto max-w-2xl w-full space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Create a new poll</h1>
        <p className="text-sm text-muted-foreground">Add a question and at least two options.</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="question" className="text-sm font-medium leading-none">Question</label>
          <textarea id="question" rows={3} placeholder="What do you think about..." className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Options</label>
          <div className="space-y-2">
            {[1, 2, 3].map((n) => (
              <input key={n} placeholder={`Option ${n}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Add option
          </button>
          <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-10 px-4 py-2">
            Create poll
          </button>
        </div>
      </form>
    </div>
  );
}


