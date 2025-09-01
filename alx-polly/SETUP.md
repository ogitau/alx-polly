# Authentication Setup Guide

## Prerequisites

1. **Install Supabase packages** (if not already installed):
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
# Get these values from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the Project URL and anon/public key
4. Paste them in your `.env.local` file

## Database Schema

The authentication system uses Supabase's built-in auth tables. No additional setup is required for basic authentication.

## Features Implemented

- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ Protected routes with middleware
- ✅ Authentication context for client-side state
- ✅ Automatic redirects for authenticated/unauthenticated users
- ✅ Sign out functionality
- ✅ Loading states during authentication checks

## Usage

### Protected Routes

Routes under `/polls` are automatically protected and require authentication.

### Authentication Context

Use the `useAuth()` hook in client components to access:

- `user`: Current user object or null
- `loading`: Boolean indicating if auth state is being determined
- `signOut`: Function to sign out the current user

### Server Actions

- `signUp(formData)`: Register a new user
- `signIn(formData)`: Sign in existing user
- `signOut()`: Sign out current user

## File Structure

```
lib/
├── auth/
│   ├── actions.ts      # Server Actions for auth
│   ├── context.tsx     # React context for auth state
│   └── utils.ts        # Server-side auth utilities
└── supabase/
    ├── client.ts       # Browser client
    └── server.ts       # Server client

components/
├── auth/
│   └── protected-route.tsx  # Client-side route protection
└── site/
    └── navbar.tsx           # Updated with auth state

middleware.ts                 # Server-side route protection
```
