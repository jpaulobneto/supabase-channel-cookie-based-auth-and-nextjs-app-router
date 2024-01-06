import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    'use server'

    const title = formData.get('title')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.from('todos').insert({ title })
    revalidatePath('/')
  }

  return (
    <form action={addTodo}>
      <input name="title" className="bg-gray-800" />
    </form>
  )
}
