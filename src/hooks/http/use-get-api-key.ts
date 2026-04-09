import { useSuspenseQuery } from '@tanstack/react-query'
import { getApiKey } from '@/http/get-api-key'
import { queryKeys } from './_query-keys'

export function useGetApiKey() {
  return useSuspenseQuery({
    queryKey: queryKeys.getApiKey,
    queryFn: getApiKey,
  })
}
