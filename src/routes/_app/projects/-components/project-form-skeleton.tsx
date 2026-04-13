import { Skeleton } from '@/components/ui/skeleton'

export function ProjectFormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-40 w-2/3" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-10 w-2/3" />
    </div>
  )
}
