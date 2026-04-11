import { useCreateProject } from '@/hooks/http/use-create-project'
import { cn } from '@/lib/utils'
import { ProjectForm } from '../../-components/project-form'

interface CreateProjectFormProps {
  repository: {
    name: string
    description: string | null
    homepageUrl: string | null
    githubUrl: string
    techsIds: string[]
  }
  disabled?: boolean
}
export function CreateProjectForm({
  repository,
  disabled,
}: CreateProjectFormProps) {
  const handleCreateProject = useCreateProject()

  return (
    <section className="w-full p-6 space-y-6 rounded-lg bg-sidebar">
      <h3
        className={cn(
          'text-lg font-semibold  transition-opacity duration-200',
          disabled && 'opacity-20',
        )}
      >
        Informações sobre o projeto
      </h3>
      <ProjectForm
        initialValues={{
          name: repository.name,
          description: repository.description,
          githubUrl: repository.githubUrl,
          deployUrl: repository.homepageUrl,
          techsIds: repository.techsIds,
        }}
        onSubmit={async (data) => {
          await handleCreateProject.mutateAsync(data)
        }}
        disabled={disabled}
      />
    </section>
  )
}
