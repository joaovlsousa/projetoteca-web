import { useGetProfile } from '@/hooks/http/use-get-profile'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Profile() {
  const {
    data: { user },
  } = useGetProfile()

  return (
    <div className="w-full max-w-46 flex items-center gap-x-2">
      <Avatar className="size-10">
        <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
        <AvatarImage src={user.avatarUrl} />
      </Avatar>

      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate">{user.name}</span>
        <span className="text-xs font-medium text-muted-foreground truncate">
          {user.username}
        </span>
      </div>
    </div>
  )
}
