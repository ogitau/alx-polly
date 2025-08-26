import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold">
            ALX Polly
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/polls" className="hover:text-foreground">Polls</Link>
            <Link href="/polls/new" className="hover:text-foreground">Create</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/signin" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-9 px-3">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}


