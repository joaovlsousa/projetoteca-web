import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useEditProject } from '@/hooks/http/use-edit-project'
import { useGetProject } from '@/hooks/http/use-get-project'
import { compareObjectValues } from '@/lib/utils'
import { ProjectForm } from '@/routes/_app/projects/-components/project-form'

interface EditProjectFormProps {
  projectId: string
}

export function EditProjectForm({ projectId }: EditProjectFormProps) {
  const navigate = useNavigate()
  const { data } = useGetProject({ projectId })
  const handleEditProject = useEditProject()

  if (!data?.project) {
    toast.error('Projeto não encontrado')

    navigate({ to: '/projects' })

    return null
  }

  const {
    project: { id: _, createdAt: __, updatedAt: ___, ...oldValues },
  } = data

  const techsIds = oldValues.techs.map((tech) => tech.id)

  const initialValues = {
    ...oldValues,
    deployUrl: oldValues.deployUrl ?? undefined,
    techsIds,
  }

  return (
    <ProjectForm
      initialValues={initialValues}
      onSubmit={async (data) => {
        if (compareObjectValues(data, initialValues)) {
          return
        }

        await handleEditProject.mutateAsync({
          projectId,
          ...data,
        })
      }}
    />
  )
}
