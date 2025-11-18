import { api } from '@/lib/axios'

export interface GetProjectsResponse {
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

export async function getProjects(): Promise<GetProjectsResponse> {
  const response = await api.get<GetProjectsResponse>('/projects')

  return response.data
}
