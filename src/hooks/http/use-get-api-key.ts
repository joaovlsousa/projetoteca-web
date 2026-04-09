import { useSuspenseQuery } from '@tanstack/react-query'
import { getApiKey } from '@/http/get-api-key'

export function useGetApiKey() {
  return useSuspenseQuery({
    queryKey: ['apiKey'],
    queryFn: getApiKey,
  })
}
