import { useSuspenseQuery } from '@tanstack/react-query'
import { getProfileStatus } from '@/http/get-profile-status'
import { queryKeys } from './_query-keys'

export function useGetProfileStatus() {
  return useSuspenseQuery({
    queryKey: queryKeys.getProfileStatus,
    queryFn: getProfileStatus,
  })
}
