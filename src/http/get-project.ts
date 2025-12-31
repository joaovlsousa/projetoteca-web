import { api } from '@/lib/axios'

interface GetProjectRequest {
  projectId: string
}

export interface GetProjectResponse {
  project: {
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
  }
}

export async function getProject({
  projectId,
}: GetProjectRequest): Promise<GetProjectResponse | null> {
  const response = await api.get<GetProjectResponse>(`/projects/${projectId}`)

  if (response.status === 204) {
    return null
  }

  return response.data
}
