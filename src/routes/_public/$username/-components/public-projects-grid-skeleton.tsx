import { Skeleton } from '@/components/ui/skeleton'
import { ProjectsGridSkeleton } from '@/routes/_app/projects/-components/projects-grid-skeleton'

export function PublicProjectsGridSkeleton() {
  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center space-y-5">
        <Skeleton className="size-40 rounded-full" />

        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="w-96 h-3" />
          <Skeleton className="w-80 h-3" />
        </div>
      </div>

      <ProjectsGridSkeleton />
    </section>
  )
}
