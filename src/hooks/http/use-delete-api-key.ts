import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteApiKey } from '@/http/delete-api-key'
import type { GetApiKeyResponse } from '@/http/get-api-key'
import { queryKeys } from './_query-keys'
import { handleHttpError } from './errors/handle-http-error'

export function useDeleteApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteApiKey,
    onSuccess: async () => {
      toast.success('Chave de API excluída com sucesso')

      queryClient.setQueryData<GetApiKeyResponse>(
        queryKeys.getApiKey,
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetApiKeyResponse = {
            apiKey: null,
          }

          return updatedQueryData
        },
      )
    },
    onError: handleHttpError,
  })
}
