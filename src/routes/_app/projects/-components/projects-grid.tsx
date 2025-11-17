import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
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

      <div>
        <Link
          to="/projects/create"
          className="flex flex-col items-center justify-center gap-y-4 rounded-md aspect-video bg-sidebar/20"
        >
          <PlusIcon />
          <span className="text-sm font-medium">Create project</span>
        </Link>
      </div>
    </div>
  )
}
