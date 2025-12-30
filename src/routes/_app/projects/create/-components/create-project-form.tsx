import { useCreateProject } from '@/hooks/http/use-create-project'
import { useGetRepositoryBySlug } from '@/hooks/http/use-get-repository-by-slug'
import { ProjectForm } from '../../-components/project-form'

interface CreateProjectFormProps {
  onPrevious: () => void
}

export function CreateProjectForm({ onPrevious }: CreateProjectFormProps) {
  const slug = localStorage.getItem('currentSlug')

  if (!slug) {
    throw new Error('Project slug not found')
  }

  const {
    data: { repository },
  } = useGetRepositoryBySlug({ slug })

  const handleCreateProject = useCreateProject()

  return (
    <ProjectForm
      initialValues={{
        name: repository.name,
        description: repository.description,
        githubUrl: repository.githubUrl,
        deployUrl: repository.homepageUrl,
        techsIds: repository.techId ? [repository.techId] : undefined,
      }}
      onSubmit={async (data) => {
        await handleCreateProject.mutateAsync(data)
      }}
      onPrevious={onPrevious}
    />
  )
}
