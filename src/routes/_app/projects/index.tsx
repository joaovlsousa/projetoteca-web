import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { MetadataCards } from './-components/metadata-cards'
import { ProjectsGrid } from './-components/projects-grid'
import { ProjectsGridSkeleton } from './-components/projects-grid-skeleton'

export const Route = createFileRoute('/_app/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-3 gap-6">
        <MetadataCards />
      </section>

      <section className="space-y-5">
        <h2 className="ml-2 text-xl font-semibold">Projetos</h2>

        <Suspense fallback={<ProjectsGridSkeleton />}>
          <ProjectsGrid />
        </Suspense>
      </section>
    </div>
  )
}
