import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useEditProject } from '@/hooks/http/use-edit-project'
import { useGetProject } from '@/hooks/http/use-get-project'
import { ProjectForm } from '@/routes/_app/projects/-components/project-form'

interface EditProjectFormProps {
  projectId: string
}

export function EditProjectForm({ projectId }: EditProjectFormProps) {
  const navigate = useNavigate()
  const {
    data: { project },
  } = useGetProject({ projectId })
  const handleEditProject = useEditProject()

  if (!project) {
    toast.error('Project not found')

    navigate({ to: '/projects' })

    return null
  }

  return (
    <ProjectForm
      initialValues={{
        name: project.name,
        description: project.description,
        type: project.type,
        githubUrl: project.githubUrl,
        deployUrl: project.deployUrl ?? undefined,
      }}
      onSubmit={async (data) => {
        await handleEditProject.mutateAsync({
          projectId,
          ...data,
        })
      }}
    />
  )
}
