'use client'

import { createClient } from '@/utils/supabase/client'

import type { ReactNode } from 'react'

export default function SignInButton({
  searchParams,
  children,
}: {
  children: ReactNode
  searchParams?: { message: string }
}) {
  const signIn = () => {
    const supabase = createClient()

    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <>
      <button onClick={signIn}>{children}</button>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </>
  )
}
