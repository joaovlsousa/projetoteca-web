import { User2Icon } from 'lucide-react'
import { useGetProfileAvatar } from '@/hooks/http/use-get-profile-avatar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function ProfileAvatar() {
  const {
    data: { avatarUrl },
  } = useGetProfileAvatar()

  return (
    <Avatar className="size-9">
      <AvatarFallback>
        <User2Icon className="size-4 text-muted-foreground" />
      </AvatarFallback>

      <AvatarImage src={avatarUrl} />
    </Avatar>
  )
}
