import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { GetProfileResponse } from '@/http/get-profile'
import { updateProfileName } from '@/http/update-profile-name'
import { handleHttpError } from './errors/handle-http-error'

export function useUpdateProfileName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfileName,
    onSuccess: async (_, { name }) => {
      toast.success('Seu nome foi atualizado')

      queryClient.setQueryData<GetProfileResponse>(
        ['profile'],
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetProfileResponse = {
            user: {
              ...oldQueryData.user,
              name,
            },
          }

          return updatedQueryData
        },
      )
    },
    onError: handleHttpError,
  })
}
