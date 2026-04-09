import { api } from '@/lib/axios'

export async function deleteApiKey(): Promise<void> {
  await api.delete('/users/api-key')
}
