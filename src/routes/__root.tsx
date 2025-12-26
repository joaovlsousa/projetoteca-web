import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'sonner'
import { queryClient } from '@/lib/query-client'

const RootLayout = () => (
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <Outlet />

      <Toaster theme="dark" richColors />
    </QueryClientProvider>
  </CookiesProvider>
)

export const Route = createRootRoute({ component: RootLayout })
