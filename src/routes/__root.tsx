import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/lib/query-client'

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Outlet />

      <Toaster position="top-center" theme="dark" richColors />
    </TooltipProvider>
  </QueryClientProvider>
)

export const Route = createRootRoute({ component: RootLayout })
