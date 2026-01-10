import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { MetadataCards } from './-components/metadata-cards'
import { MetadataCardsSkeleton } from './-components/metadata-cards-skeleton'
import { ProjectsGrid } from './-components/projects-grid'
import { ProjectsGridSkeleton } from './-components/projects-grid-skeleton'

export const Route = createFileRoute('/_app/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<MetadataCardsSkeleton />}>
        <MetadataCards />
      </Suspense>

      <section className="space-y-5">
        <h2 className="ml-2 text-xl font-semibold">Projetos</h2>

        <Suspense fallback={<ProjectsGridSkeleton />}>
          <ProjectsGrid />
        </Suspense>
      </section>
    </div>
  )
}
