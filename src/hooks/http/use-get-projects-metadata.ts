import { useSuspenseQuery } from '@tanstack/react-query'
import { getProjectsMetadata } from '@/http/get-projects-metadata'

export function useGetProjectsMetadata() {
  return useSuspenseQuery({
    queryKey: ['projects', 'metadata'],
    queryFn: getProjectsMetadata,
  })
}
