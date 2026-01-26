import { api } from '@/lib/axios'

interface UpdateProfileStatusRequest {
  isPublicProfile: boolean
}

export async function updateProfileStatus(
  payload: UpdateProfileStatusRequest,
): Promise<void> {
  await api.patch<void>('/users/profile/status', payload)
}
