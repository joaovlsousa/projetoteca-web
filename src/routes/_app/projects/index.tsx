import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ProjectsGrid } from './-components/projects-grid'
import { ProjectsGridSkeleton } from './-components/projects-grid-skeleton'

export const Route = createFileRoute('/_app/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full">
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid />
      </Suspense>
    </div>
  )
}
