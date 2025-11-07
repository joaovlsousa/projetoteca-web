import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AppNavbar } from '@/components/app-navbar'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
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
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full min-h-screen">
        <AppNavbar />

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
