import { useSuspenseQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/get-projects'
import { queryKeys } from './_query-keys'

export function useGetProjects() {
  return useSuspenseQuery({
    queryKey: queryKeys.getProjects,
    queryFn: getProjects,
  })
}
