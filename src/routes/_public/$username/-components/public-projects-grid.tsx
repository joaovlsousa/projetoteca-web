import { ProjectCard } from '@/components/project-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetPublicProjects } from '@/hooks/http/use-get-public-projects'

interface PublicProjectsGridProps {
  username: string
}

export function PublicProjectsGrid({ username }: PublicProjectsGridProps) {
  const {
    data: { projects, user },
  } = useGetPublicProjects({ username })

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center space-y-5">
        <Avatar className="size-40">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-2xl font-medium">{user.name}</h2>
          <span className="text-muted-foreground">{user.username}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isPublicProject />
        ))}
      </div>
    </section>
  )
}
