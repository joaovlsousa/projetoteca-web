import { useSuspenseQuery } from '@tanstack/react-query'
import {
  type GetPublicProjectsRequest,
  getPublicProjects,
} from '@/http/get-public-projects'
import { queryKeys } from './_query-keys'

export function useGetPublicProjects({ username }: GetPublicProjectsRequest) {
  return useSuspenseQuery({
    queryKey: [...queryKeys.getProjects, username],
    queryFn: async () => await getPublicProjects({ username }),
  })
}
