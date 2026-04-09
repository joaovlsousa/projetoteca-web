import { useSuspenseQuery } from '@tanstack/react-query'
import { getProfileStatus } from '@/http/get-profile-status'

export function useGetProfileStatus() {
  return useSuspenseQuery({
    queryKey: ['profile', 'status'],
    queryFn: getProfileStatus,
  })
}
