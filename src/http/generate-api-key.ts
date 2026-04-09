import { api } from '@/lib/axios'

export interface GenerateApiKeyResponse {
  apiKey: string | null
}

export async function generateApiKey(): Promise<GenerateApiKeyResponse> {
  const response = await api.post<GenerateApiKeyResponse>('/users/api-key')

  return response.data
}
