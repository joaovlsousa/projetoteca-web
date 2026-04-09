import { api } from '@/lib/axios'

interface UpdateProfileNameRequest {
  name: string
}

export async function updateProfileName(
  payload: UpdateProfileNameRequest,
): Promise<void> {
  await api.patch<void>('/users/profile/name', payload)
}
