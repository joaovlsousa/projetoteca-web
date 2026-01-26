import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSettingsSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-10">
      <Skeleton className="h-32 w-full max-w-lg" />

      <div className="w-full flex flex-col items-center space-y-6">
        <Skeleton className="h-10 w-full max-w-lg" />
        <Skeleton className="h-10 w-full max-w-lg" />
      </div>
    </div>
  )
}
