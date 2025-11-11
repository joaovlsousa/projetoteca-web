import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { useGetProjects } from '@/http/use-get-projects'

export function ProjectsGrid() {
  const { data: projects } = useGetProjects()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <pre key={project.id}>{JSON.stringify(project)}</pre>
      ))}

      <Link to="/projects/create">
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-md aspect-video bg-sidebar/20">
          <PlusIcon />
          <span className="text-sm font-medium">Create project</span>
        </div>
      </Link>
    </div>
  )
}
