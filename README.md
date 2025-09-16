# ALX Polly

ALX Polly is a full‑stack polling app built with Next.js App Router, Supabase Auth + Database, and Tailwind CSS. Users can sign up, create polls with multiple options, vote once per poll, and view live results with a simple chart.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3
- Supabase: Auth, Postgres, Row Level Security

## Features
- Email/password authentication (Supabase)
- Protected routes with middleware and server helpers
- Create polls with 2–10 options
- One vote per user per poll (RLS + unique constraint)
- Poll list and detail pages powered by Supabase
- Inline vote button and results chart per poll

---

## Prerequisites
- Node.js 18+ (or Bun), npm
- Supabase project (free tier works)

## Environment Variables
Create `alx-polly/.env.local` with your Supabase credentials:


Make sure these point to the same Supabase project where you will run the SQL schema below.

## Install & Run

```bash
cd alx-polly/alx-polly
npm install
npm run dev
# visit http://localhost:3000
```

If you changed Tailwind or PostCSS versions, reinstall dependencies to ensure correct versions are installed.

---

## Supabase Setup
1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `supabase-schema.sql` and execute
3. (Optional) If you created tables but still see schema errors, run:

```sql
NOTIFY pgrst, 'reload schema';
```

### What the schema creates
- `polls(id, question, user_id, created_at, updated_at)`
- `poll_options(id, poll_id, text, order_index, created_at)`
- `votes(id, poll_id, option_id, user_id, created_at)` with unique `(poll_id, user_id)`
- RLS policies for read/write by owners and public read where appropriate

---

## App Structure

```text
app/
  (auth)/signin, signup      # Auth pages
  (polls)/polls              # Poll listing
    [id]/page.tsx            # Poll detail + vote + chart
    new/page.tsx             # Create poll form
lib/
  auth/                      # auth server actions + context
  polls/actions.ts           # createPoll, voteOnPoll, voteAction
  supabase/{client,server}.ts# SSR/CSR Supabase helpers
```

---

## Key Flows

### Authentication
- Middleware refreshes session and redirects based on auth status
- Server actions use the SSR `createClient()` helper (async) to access the user

### Create Poll
- Page: `app/(polls)/polls/new/page.tsx`
- Client form: `components/polls/create-poll-form.tsx`
- Server action: `createPoll` inserts poll and options then redirects to detail

### Vote & Results
- Detail page fetches `polls`, `poll_options`, and aggregates `votes`
- Displays a horizontal bar chart with counts and percentages
- `voteAction` posts a vote; duplicate votes are blocked by DB constraint

---

## Troubleshooting

- Module not found: tailwindcss
  - Ensure `devDependencies` include `tailwindcss@^3`, `postcss@^8`, `autoprefixer@^10`
  - Reinstall: `npm install`

- Cookies API error (Next sync dynamic API)
  - We use async `createClient()` in `lib/supabase/server.ts` and await `cookies()`

- Supabase table not found (PGRST205)
  - Run `supabase-schema.sql` in your project; then: `NOTIFY pgrst, 'reload schema';`
  - Verify your `.env.local` points to the same project

- Redirect shows as error in logs
  - Expected in Next. We rethrow `NEXT_REDIRECT` in server actions to avoid noisy logs

---

## Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

## License
MIT
