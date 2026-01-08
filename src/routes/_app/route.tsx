import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      navigate({ to: '/' })
    }
  }, [token, navigate])

  return (
    <>
      <Sidebar />

      <main className="relative ml-14 w-full max-w-[calc(100%-3.5rem)]">
        <Navbar />

        <div className="mt-14 w-full p-6">
          <Outlet />
        </div>
      </main>
    </>
  )
}
