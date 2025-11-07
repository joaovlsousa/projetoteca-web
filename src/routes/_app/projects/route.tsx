import { createFileRoute } from '@tanstack/react-router'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const Route = createFileRoute('/_app/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello /projects!
      <SidebarTrigger />
    </div>
  )
}
