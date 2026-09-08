import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
  mode?: 'login' | 'dashboard'
}

export function AppLayout({ children, mode = 'login' }: AppLayoutProps) {
  return <main className={`app-shell app-shell--${mode}`}>{children}</main>
}
