import { api } from '@/lib/axios'

interface DeleteProjectRequest {
  projectId: string
}

export async function deleteProject({
  projectId,
}: DeleteProjectRequest): Promise<void> {
  await api.delete(`/projects/${projectId}`)
}
