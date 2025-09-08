## Middleware and Configuration

### Middleware
- **File**: `middleware.ts`
- Responsibilities:
  - Creates a Supabase server client with cookie passthrough
  - Refreshes the session for Server Components (`supabase.auth.getUser()`)
  - Protects routes: `/polls`, `/polls/new` require authenticated user
  - Redirects authenticated users away from `/signin` and `/signup` to `/polls`
  - Applies to all routes except Next.js static assets and favicon (see `config.matcher`)

Key behavior:
```ts
export async function middleware(request: NextRequest) {
  // ...setup supabase and refresh session...
  const protectedRoutes = ['/polls', '/polls/new']
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.redirect(new URL('/signin', request.url))
  }

  const authRoutes = ['/signin', '/signup']
  if (authRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) return NextResponse.redirect(new URL('/polls', request.url))
  }
}
```

### Next.js Config
- **File**: `next.config.ts`
- Currently uses the default exported config. Extend here as needed (e.g., images, headers, redirects).

