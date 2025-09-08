## Auth Components and Hooks

### AuthProvider and useAuth

- **Exports**: `AuthProvider`, `useAuth`
- **Source**: `lib/auth/context.tsx`

The `AuthProvider` sets up client-side authentication state using Supabase. Wrap your application in this provider (already applied in `app/layout.tsx`).

`useAuth()` returns `{ user, loading, signOut }`:
- **user**: Supabase `User | null`
- **loading**: `boolean`, true while session is resolving
- **signOut**: `() => Promise<void>`; signs out on the client

Import:
```tsx
import { AuthProvider, useAuth } from "@/lib/auth/context";
```

Usage:
```tsx
'use client'

import { useAuth } from "@/lib/auth/context";

export function ProfileGreeting() {
  const { user, loading, signOut } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <a href="/signin">Sign in</a>;
  return (
    <div className="flex items-center gap-2">
      <span>Hello, {user.user_metadata?.name || user.email}</span>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
```

### ProtectedRoute

- **Export**: `ProtectedRoute`
- **Source**: `components/auth/protected-route.tsx`

Client-side wrapper that ensures children render only when a user is authenticated. While auth state resolves, renders a loading placeholder; if unauthenticated, navigates to `/signin`.

Import and usage:
```tsx
'use client'
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function PrivatePage() {
  return (
    <ProtectedRoute>
      <div>Secret content only for signed-in users.</div>
    </ProtectedRoute>
  );
}
```

### AuthError

- **Export**: `AuthError`
- **Source**: `components/auth/auth-error.tsx`

Client component that reads `error` and `message` from the URL query and displays contextual feedback. Useful on sign-in/up pages that redirect with query params.

Import and usage:
```tsx
'use client'
import { AuthError } from "@/components/auth/auth-error";

export default function SignInScreen() {
  return (
    <div>
      <h1>Sign in</h1>
      <AuthError />
      {/* ... form ... */}
    </div>
  );
}
```

Query parameters:
- **error**: URL-encoded error text to display in red
- **message**: URL-encoded message text to display in green

