import { useGetProfile } from '@/hooks/http/use-get-profile'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Profile() {
  const {
    data: { user },
  } = useGetProfile()

  return (
    <div className="flex items-center gap-x-3">
      <div className="space-y-0.5">
        <p className="text-xs font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.username}</p>
      </div>

      <Avatar className="size-10">
        <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>

        <AvatarImage src={user.avatarUrl} />
      </Avatar>
    </div>
  )
}
