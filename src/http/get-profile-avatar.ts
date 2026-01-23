import { api } from '@/lib/axios'

interface GetProfileAvatarResponse {
  avatarUrl: string
}

export async function getProfileAvatar(): Promise<GetProfileAvatarResponse> {
  const response = await api.get<GetProfileAvatarResponse>(
    '/users/profile/avatar',
  )

  return response.data
}
