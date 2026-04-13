import { useSuspenseQuery } from '@tanstack/react-query'
import { getStorageMetadata } from '@/http/get-storage-metadata'
import { queryKeys } from './_query-keys'

export function useGetStorageMetadata() {
  return useSuspenseQuery({
    queryKey: queryKeys.getStorageMetadata,
    queryFn: getStorageMetadata,
  })
}
