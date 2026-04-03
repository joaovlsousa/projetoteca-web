import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ProjectFormSkeleton } from '../../-components/project-form-skeleton'
import { EditProjectForm } from './-components/edit-project-form'

export const Route = createFileRoute('/_app/projects/$projectId/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useParams()

  return (
    <main className="w-full p-6 space-y-6 rounded-lg bg-sidebar">
      <h2 className="text-lg font-semibold">Atualizar projeto</h2>

      <Suspense fallback={<ProjectFormSkeleton />}>
        <EditProjectForm projectId={projectId} />
      </Suspense>
    </main>
  )
}
