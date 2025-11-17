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
    <div className="flex flex-col items-center justify-center space-y-10">
      <h2 className="text-xl font-medium">Edit project</h2>

      <div className="w-full max-w-lg">
        <Suspense fallback={<ProjectFormSkeleton />}>
          <EditProjectForm projectId={projectId} />
        </Suspense>
      </div>
    </div>
  )
}
