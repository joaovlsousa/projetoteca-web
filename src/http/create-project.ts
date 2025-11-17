import { api } from '@/lib/axios'

interface CreateProjectsRequest {
  name: string
  description: string
  type: 'frontend' | 'backend' | 'fullstack'
  githubUrl: string
  deployUrl?: string
}

interface CreateProjectsResponse {
  projectId: string
}

export async function createProject(
  payload: CreateProjectsRequest,
): Promise<CreateProjectsResponse> {
  const response = await api.post<CreateProjectsResponse>('/projects', {
    ...payload,
  })

  return response.data
}
