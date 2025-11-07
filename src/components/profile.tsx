import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSidebar } from './ui/sidebar'

export function Profile() {
  const { state } = useSidebar()

  return (
    <div className="py-4 flex items-center gap-x-3">
      <Avatar className={cn(state === 'expanded' && 'size-10')}>
        <AvatarFallback>J</AvatarFallback>

        <AvatarImage />
      </Avatar>

      {state === 'expanded' && (
        <div className={cn('flex flex-1 flex-col min-w-0')}>
          <span className="text-sm font-semibold truncate">João Vitor</span>
          <span className="text-xs font-medium text-muted-foreground truncate">
            joaovlsousa
          </span>
        </div>
      )}
    </div>
  )
}
