## App Routes

This project uses the Next.js App Router. Below are the public pages and their behavior.

### Layout
- **File**: `app/layout.tsx`
- Wraps the app with `AuthProvider` and renders the `Navbar`. Sets global fonts and includes `globals.css`.

### Public Pages
- **Home**: `app/page.tsx`
  - Landing page with calls to action to sign up or sign in.

### Auth Pages
- **Sign In**: `app/(auth)/signin/page.tsx`
  - Renders a sign-in form bound to server action `signIn`
  - Displays `<AuthError />` for error/success messages from query params

- **Sign Up**: `app/(auth)/signup/page.tsx`
  - Renders a sign-up form bound to server action `signUp`
  - Displays `<AuthError />` for error/success messages from query params

### Polls
- **List**: `app/(polls)/polls/page.tsx`
  - Lists sample polls (placeholder UI). Protected via middleware.

- **Create**: `app/(polls)/polls/new/page.tsx`
  - Form for creating a poll (placeholder UI). Protected via middleware.

- **Detail**: `app/(polls)/polls/[id]/page.tsx`
  - Dynamic route showing poll detail (placeholder UI). Access allowed for all users; voting prompts sign-in.

### Protection and Redirects
- Access to `/polls` and `/polls/new` requires authentication (see middleware).
- Visiting `/signin` or `/signup` when already authenticated will redirect to `/polls`.

