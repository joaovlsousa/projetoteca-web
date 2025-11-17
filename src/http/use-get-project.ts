import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface GetProjectRequest {
  projectId: string
}

interface GetProjectResponse {
  project: {
    id: string
    name: string
    description: string
    type: 'frontend' | 'backend' | 'fullstack'
    imageUrl: string | null
    githubUrl: string
    deployUrl: string | null
    createdAt: string
    updatedAt: string | null
  }
}

export function useGetProject({ projectId }: GetProjectRequest) {
  return useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await api.get<GetProjectResponse>(
        `/projects/${projectId}`,
      )

      if (response.status === 204) {
        return { project: null }
      }

      return response.data
    },
  })
}
