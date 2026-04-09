import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { generateApiKey } from '@/http/generate-api-key'
import type { GetApiKeyResponse } from '@/http/get-api-key'
import { queryKeys } from './_query-keys'
import { handleHttpError } from './errors/handle-http-error'

export function useGenerateApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: generateApiKey,
    onSuccess: async ({ apiKey }) => {
      toast.success('Chave de API gerada com sucesso')

      queryClient.setQueryData<GetApiKeyResponse>(
        queryKeys.getApiKey,
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetApiKeyResponse = {
            apiKey,
          }

          return updatedQueryData
        },
      )
    },
    onError: handleHttpError,
  })
}
