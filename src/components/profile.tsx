import { useGetProfile } from '@/hooks/http/use-get-profile'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSidebar } from './ui/sidebar'

export function Profile() {
  const { state } = useSidebar()
  const {
    data: { user },
  } = useGetProfile()

  return (
    <div className="py-4 flex items-center gap-x-3">
      <Avatar className={cn(state === 'expanded' && 'size-10')}>
        <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>

        <AvatarImage src={user.avatarUrl} />
      </Avatar>

      {state === 'expanded' && (
        <div className="flex flex-1 flex-col min-w-0">
          <span className="text-sm font-semibold truncate">{user.name}</span>
          <span className="text-xs font-medium text-muted-foreground truncate">
            {user.username}
          </span>
        </div>
      )}
    </div>
  )
}
