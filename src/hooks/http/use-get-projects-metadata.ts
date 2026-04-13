import { useSuspenseQuery } from '@tanstack/react-query'
import { getProjectsMetadata } from '@/http/get-projects-metadata'
import { queryKeys } from './_query-keys'

export function useGetProjectsMetadata() {
  return useSuspenseQuery({
    queryKey: queryKeys.getProjectsMetadata,
    queryFn: getProjectsMetadata,
  })
}
