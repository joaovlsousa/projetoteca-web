import { api } from '@/lib/axios'

export interface GetRepositoriesResponse {
  repositories: {
    slug: string
    name: string
  }[]
}

export async function getRepositories(): Promise<GetRepositoriesResponse> {
  const response = await api.get<GetRepositoriesResponse>('/repos')

  return response.data
}
