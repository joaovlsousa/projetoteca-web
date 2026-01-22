import { useSuspenseQuery } from '@tanstack/react-query'
import { getStorageMetadata } from '@/http/get-storage-metadata'

export function useGetStorageMetadata() {
  return useSuspenseQuery({
    queryKey: ['storage', 'metadata'],
    queryFn: getStorageMetadata,
  })
}
