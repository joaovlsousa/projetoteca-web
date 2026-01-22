import { api } from '@/lib/axios'

export interface GetStorageMetadataResponse {
  metadata: {
    countStorageInBytes: number
    totalOfStorageInBytesByUser: number
  }
}

export async function getStorageMetadata(): Promise<GetStorageMetadataResponse> {
  const response = await api.get<GetStorageMetadataResponse>(
    '/projects/storage/metadata',
  )

  return response.data
}
