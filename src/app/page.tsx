import NewTodo from '@/components/NewTodo'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.from('todos').select()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/unauthenticated')
  }

  return (
    <main>
      <h1>
        Hello, {session.user.user_metadata.full_name || session.user.email}
      </h1>
      <NewTodo />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
