import { api } from '@/lib/axios'

interface EditProjectsRequest {
  projectId: string
  name: string
  description: string
  type: 'frontend' | 'backend' | 'fullstack'
  githubUrl: string
  deployUrl?: string
}

export async function editProject({
  projectId,
  ...payload
}: EditProjectsRequest): Promise<void> {
  await api.put<void>(`/projects/${projectId}`, {
    ...payload,
  })
}
