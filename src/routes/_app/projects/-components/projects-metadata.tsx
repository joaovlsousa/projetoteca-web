import { Progress } from '@/components/ui/progress'
import { useGetProjectsMetadata } from '@/hooks/http/use-get-projects-metadata'

export function ProjectsMetadata() {
  const {
    data: { metadata },
  } = useGetProjectsMetadata()

  const projetcsPercentage =
    (metadata.countProjects / metadata.totalOfProjectsByUser) * 100

  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-sm">{projetcsPercentage.toFixed(1)}%</span>

      <Progress value={projetcsPercentage} />

      <span className="text-xs text-muted-foreground ml-auto">
        {metadata.countProjects} / {metadata.totalOfProjectsByUser}
      </span>
    </div>
  )
}
