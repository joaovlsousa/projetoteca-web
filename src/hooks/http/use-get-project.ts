import { useSuspenseQuery } from '@tanstack/react-query'
import { getProject } from '@/http/get-project'

interface GetProjectRequest {
  projectId: string
}

export function useGetProject({ projectId }: GetProjectRequest) {
  return useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: async () => await getProject({ projectId }),
  })
}
