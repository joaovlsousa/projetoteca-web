import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteApiKey } from '@/http/delete-api-key'
import type { GetApiKeyResponse } from '@/http/get-api-key'
import { handleHttpError } from './errors/handle-http-error'

export function useDeleteApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteApiKey,
    onSuccess: async () => {
      toast.success('API Key gerada com sucesso')

      queryClient.setQueryData<GetApiKeyResponse>(
        ['apiKey'],
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
