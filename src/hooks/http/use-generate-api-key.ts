import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { generateApiKey } from '@/http/generate-api-key'
import type { GetApiKeyResponse } from '@/http/get-api-key'
import { handleHttpError } from './errors/handle-http-error'

export function useGenerateApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: generateApiKey,
    onSuccess: async ({ apiKey }) => {
      toast.success('API Key gerada com sucesso')

      queryClient.setQueryData<GetApiKeyResponse>(
        ['apiKey'],
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
