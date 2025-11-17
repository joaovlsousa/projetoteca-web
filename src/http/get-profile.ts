import { api } from '@/lib/axios'

interface GetProfileResponse {
  user: {
    name: string
    username: string
    avatarUrl: string
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get<GetProfileResponse>('/profile')

  return response.data
}
