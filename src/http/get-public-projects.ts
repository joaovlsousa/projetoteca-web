import { api } from '@/lib/axios'

export interface GetPublicProjectsRequest {
  username: string
}

export interface GetPublicProjectsResponse {
  projects: {
    id: string
    name: string
    description: string
    type: 'frontend' | 'backend' | 'fullstack'
    techs: {
      id: string
      name: string
      imageUrl: string
    }[]
    imageUrl: string | null
    githubUrl: string
    deployUrl: string | null
    createdAt: string
    updatedAt: string | null
  }[]
  user: {
    name: string
    username: string
    avatarUrl: string
  }
}

export async function getPublicProjects({
  username,
}: GetPublicProjectsRequest): Promise<GetPublicProjectsResponse> {
  const response = await api.get<GetPublicProjectsResponse>(
    `/public/projects/${username}`,
  )

  return response.data
}
