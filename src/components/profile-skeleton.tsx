import { Skeleton } from './ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="w-full max-w-46 flex items-center gap-x-2">
      <Skeleton className="size-10 rounded-full" />

      <div className="w-2/3 space-y-2">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-full" />
      </div>
    </div>
  )
}
