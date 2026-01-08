import { Skeleton } from './ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="space-y-1">
        <Skeleton className="w-[80px] h-4 rounded-full" />
        <Skeleton className="w-[120px] h-2.5 rounded-full" />
      </div>

      <Skeleton className="size-10 rounded-full" />
    </div>
  )
}
