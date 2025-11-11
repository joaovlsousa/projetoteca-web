import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface GetProjectsResponse {
  projects: {
    id: string
    name: string
    description: string
    type: 'frontend' | 'backend' | 'fullstack'
    imageUrl: string | null
    githubUrl: string
    deployUrl: string | null
    createdAt: string
    updatedAt: string | null
  }[]
}

export function useGetProjects() {
  return useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get<GetProjectsResponse>('/projects')

      return response.data.projects
    },
  })
}
