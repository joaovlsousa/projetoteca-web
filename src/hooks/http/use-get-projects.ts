import { useSuspenseQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/get-projects'

export function useGetProjects() {
  return useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}
