import { Skeleton } from '@/components/ui/skeleton'

export function MetadataCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Skeleton className="aspect-video" />
      <Skeleton className="aspect-video" />
      <Skeleton className="aspect-video" />
    </div>
  )
}
