import NewTodo from '@/components/NewTodo'
import Todo from '@/components/Todo'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: todos } = await supabase
    .from('todos')
    .select()
    .match({ is_complete: false })

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
      {todos?.map((todo) => (
        <p key={todo.id}>
          <Todo todo={todo} />
        </p>
      ))}
    </main>
  )
}
