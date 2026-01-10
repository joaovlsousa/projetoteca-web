import { useGetProjects } from '@/hooks/http/use-get-projects'
import { ProjectCard } from './project-card'

export function ProjectsGrid() {
  const {
    data: { projects },
  } = useGetProjects()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
