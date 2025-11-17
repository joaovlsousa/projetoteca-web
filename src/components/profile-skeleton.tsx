import { cn } from '@/lib/utils'
import { useSidebar } from './ui/sidebar'
import { Skeleton } from './ui/skeleton'

export function ProfileSkeleton() {
  const { state } = useSidebar()

  return (
    <div className="py-4 flex items-center gap-x-3">
      <Skeleton
        className={cn('size-8 rounded-full', state === 'expanded' && 'size-10')}
      />

      {state === 'expanded' && (
        <div className="flex flex-1 flex-col min-w-0 gap-y-2">
          <Skeleton className="w-3/4 h-4 rounded-full" />
          <Skeleton className="w-full h-2.5 rounded-full" />
        </div>
      )}
    </div>
  )
}
