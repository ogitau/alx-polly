## Auth Library

Server actions and utilities for authentication.

### Server Actions (use server)

- **Source**: `lib/auth/actions.ts`
- All functions are server actions intended to be bound to `<form action={...}>` in App Router.

#### signUp(formData: FormData): Promise<void>
Registers a new user with email/password and optional `name` metadata. On error, redirects back to `/signup?error=...`. On success, redirects to `/signin?message=...`.

Required fields in `FormData`:
- `name`: string
- `email`: string (valid email)
- `password`: string (min 6)

Example:
```tsx
// app/(auth)/signup/page.tsx
<form action={signUp}>
  <input name="name" />
  <input name="email" type="email" />
  <input name="password" type="password" />
  <button type="submit">Create Account</button>
</form>
```

#### signIn(formData: FormData): Promise<void>
Authenticates an existing user via `supabase.auth.signInWithPassword`. On error, redirects to `/signin?error=...`. On success, redirects to `/polls`.

Required fields:
- `email`: string
- `password`: string

Example:
```tsx
<form action={signIn}>
  <input name="email" type="email" />
  <input name="password" type="password" />
  <button type="submit">Sign in</button>
</form>
```

#### signOut(): Promise<void>
Signs out current user then redirects to `/`.

Example:
```tsx
'use client'
import { useAuth } from '@/lib/auth/context'

function SignOutButton() {
  const { signOut } = useAuth()
  return <button onClick={signOut}>Sign out</button>
}
```

Server-side sign out via action:
```tsx
// Server action variant
import { signOut } from '@/lib/auth/actions'
<form action={signOut}><button>Sign out</button></form>
```

### Server Utilities

- **Source**: `lib/auth/utils.ts`

#### getUser(): Promise<User | null>
Fetches the current authenticated user on the server using the Supabase server client. Returns `null` on error.

Example:
```tsx
// In a server component or route handler
import { getUser } from '@/lib/auth/utils'

const user = await getUser()
```

#### requireAuth(): Promise<User>
Ensures a user is authenticated on the server. If not, redirects to `/signin`. Returns the `User` when present.

Example:
```tsx
import { requireAuth } from '@/lib/auth/utils'

export default async function ProtectedServerPage() {
  const user = await requireAuth()
  return <div>Welcome {user.email}</div>
}
```

