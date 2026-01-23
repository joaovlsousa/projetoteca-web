import { useSuspenseQuery } from '@tanstack/react-query'
import { getProfileAvatar } from '@/http/get-profile-avatar'

export function useGetProfileAvatar() {
  return useSuspenseQuery({
    queryKey: ['profile', 'avatar'],
    queryFn: getProfileAvatar,
  })
}
