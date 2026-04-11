import { useSuspenseQuery } from '@tanstack/react-query'
import { type GetProjectRequest, getProject } from '@/http/get-project'
import { queryKeys } from './_query-keys'

export function useGetProject({ projectId }: GetProjectRequest) {
  return useSuspenseQuery({
    queryKey: [...queryKeys.getProjects, projectId],
    queryFn: async () => await getProject({ projectId }),
  })
}
