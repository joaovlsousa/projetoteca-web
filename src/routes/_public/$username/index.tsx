import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/components/logo'
import { PublicProjectsGrid } from './-components/public-projects-grid'

export const Route = createFileRoute('/_public/$username/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()

  return (
    <main className="max-w-5xl mx-auto space-y-14 py-24">
      <section className="space-y-8 max-w-xl mx-auto">
        <header className="flex items-center justify-center">
          <Logo />
        </header>
      </section>

      <PublicProjectsGrid username={username} />
    </main>
  )
}
