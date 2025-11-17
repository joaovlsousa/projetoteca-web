import { useSuspenseQuery } from '@tanstack/react-query'
import { getProfile } from '@/http/get-profile'

export function useGetProfile() {
  return useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}
