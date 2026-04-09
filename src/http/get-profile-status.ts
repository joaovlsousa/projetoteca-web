import { api } from '@/lib/axios'

export interface GetProfileStatusResponse {
  isPublicProfile: boolean
}

export async function getProfileStatus(): Promise<GetProfileStatusResponse> {
  const response = await api.get<GetProfileStatusResponse>(
    '/users/profile/status',
  )

  return response.data
}
