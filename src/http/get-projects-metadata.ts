import { api } from '@/lib/axios'

export interface GetProjectsMetadataResponse {
  metadata: {
    countProjects: number
    totalOfProjectsByUser: number
  }
}

export async function getProjectsMetadata(): Promise<GetProjectsMetadataResponse> {
  const response =
    await api.get<GetProjectsMetadataResponse>('/projects/metadata')

  return response.data
}
