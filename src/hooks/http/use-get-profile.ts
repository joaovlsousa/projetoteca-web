import { useSuspenseQuery } from '@tanstack/react-query'
import { getProfile } from '@/http/get-profile'
import { queryKeys } from './_query-keys'

export function useGetProfile() {
  return useSuspenseQuery({
    queryKey: queryKeys.getProfile,
    queryFn: getProfile,
  })
}
