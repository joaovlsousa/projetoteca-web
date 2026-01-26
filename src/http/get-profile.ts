import { api } from '@/lib/axios'

export interface GetProfileResponse {
  user: {
    name: string
    username: string
    isPublicProfile: boolean
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get<GetProfileResponse>('/users/profile')

  return response.data
}
