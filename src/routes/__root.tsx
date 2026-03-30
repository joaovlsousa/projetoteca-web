import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { queryClient } from '@/lib/query-client'

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <Outlet />

    <Toaster position="top-center" richColors />
  </QueryClientProvider>
)

export const Route = createRootRoute({ component: RootLayout })
