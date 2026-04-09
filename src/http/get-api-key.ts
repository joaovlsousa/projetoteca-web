import { api } from '@/lib/axios'

export interface GetApiKeyResponse {
  apiKey: string | null
}

export async function getApiKey(): Promise<GetApiKeyResponse> {
  const response = await api.get<GetApiKeyResponse>('/users/api-key')

  return response.data
}
