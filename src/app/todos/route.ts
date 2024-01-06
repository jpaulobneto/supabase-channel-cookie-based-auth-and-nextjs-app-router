import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const { id } = await request.json()

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase
    .from('todos')
    .update({ is_complete: true })
    .match({ id })

  return NextResponse.json(data)
}
