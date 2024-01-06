import type { ReactNode } from 'react'

export default function Button({ children }: { children: ReactNode }) {
  return <div className="flex gap-2">{children}</div>
}
