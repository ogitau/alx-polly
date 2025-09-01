'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";

export function Navbar() {
  const { user, loading, signOut } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold">
            ALX Polly
          </Link>
          {user && (
            <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/polls" className="hover:text-foreground">Polls</Link>
              <Link href="/polls/new" className="hover:text-foreground">Create</Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.user_metadata?.name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-muted-foreground hover:text-foreground">
                Sign in
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


