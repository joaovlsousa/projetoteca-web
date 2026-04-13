import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { GetProfileStatusResponse } from '@/http/get-profile-status'
import { updateProfileStatus } from '@/http/update-profile-status'
import { queryKeys } from './_query-keys'
import { handleHttpError } from './errors/handle-http-error'

export function useUpdateProfileStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfileStatus,
    onSuccess: async (_, { isPublicProfile }) => {
      toast.info(
        isPublicProfile
          ? 'Seu perfil agora é público'
          : 'Seu perfil agora é privado',
      )

      queryClient.setQueryData<GetProfileStatusResponse>(
        queryKeys.getProfileStatus,
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetProfileStatusResponse = {
            isPublicProfile,
          }

          return updatedQueryData
        },
      )
    },
    onError: handleHttpError,
  })
}
