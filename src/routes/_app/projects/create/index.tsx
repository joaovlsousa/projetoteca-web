import { createFileRoute } from '@tanstack/react-router'
import { useCreateProject } from '@/http/use-create-project'
import { ProjectForm } from '../-components/project-form'

export const Route = createFileRoute('/_app/projects/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleCreateProject = useCreateProject()

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <h2 className="text-xl font-medium">Create project</h2>

      <div className="w-full max-w-lg">
        <ProjectForm
          onSubmit={async (data) => {
            await handleCreateProject.mutateAsync(data)
          }}
        />
      </div>
    </div>
  )
}
