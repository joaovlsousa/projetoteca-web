import { useSuspenseQuery } from '@tanstack/react-query'
import {
  type GetRepositoryBySlugRequest,
  getRepositoryBySlug,
} from '@/http/get-repository-by-slug'

export function useGetRepositoryBySlug(params: GetRepositoryBySlugRequest) {
  return useSuspenseQuery({
    queryKey: ['repository', params.slug],
    queryFn: () => getRepositoryBySlug(params),
  })
}
