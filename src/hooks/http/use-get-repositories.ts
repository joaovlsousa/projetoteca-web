import { useSuspenseQuery } from '@tanstack/react-query'
import { getRepositories } from '@/http/get-repositories'

export function useGetRepositories() {
  return useSuspenseQuery({
    queryKey: ['repositories'],
    queryFn: getRepositories,
  })
}
