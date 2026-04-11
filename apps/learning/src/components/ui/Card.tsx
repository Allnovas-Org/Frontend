import type { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200  px-6 py-32 shadow-soft">
      {children}
    </div>
  )
}
