import { Skeleton } from '@/components/ui/skeleton'

export function ProfileStatusSettingsSkeleton() {
  return (
    <div className="w-full p-6 rounded-lg bg-sidebar">
      <Skeleton className="h-40 max-w-lg" />
    </div>
  )
}
