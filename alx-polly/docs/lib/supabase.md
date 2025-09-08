## Supabase Helpers

Thin wrappers for creating Supabase clients in browser and server contexts using `@supabase/ssr`.

### Environment Variables
Add to `.env.local` (see `SETUP.md` for details):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Browser Client

- **Export**: `createClient()`
- **Source**: `lib/supabase/client.ts`

Creates a browser Supabase client bound to public env variables.

Usage:
```tsx
'use client'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Server Client

- **Export**: `createClient()`
- **Source**: `lib/supabase/server.ts`

Creates a server Supabase client bound to Next.js cookies for SSR/App Router. Handles cookie `getAll`/`setAll` under the hood.

Usage:
```tsx
import { createClient } from '@/lib/supabase/server'

export default async function ServerPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
```

### Notes
- Do not expose service role keys in the browser
- Use the server client inside server components, route handlers, and server actions
- Middleware also uses `@supabase/ssr` to refresh sessions

