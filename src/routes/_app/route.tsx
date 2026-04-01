import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
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

      <div className="ml-64 w-[100%-16rem] p-6">
        <main className="max-w-5xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  )
}
