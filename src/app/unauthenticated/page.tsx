import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Unauthenticated() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return <p>Please sign in to see todos!</p>
}
