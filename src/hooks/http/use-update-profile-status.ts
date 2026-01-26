import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { GetProfileResponse } from '@/http/get-profile'
import { updateProfileStatus } from '@/http/update-profile-status'
import { handleHttpError } from './errors/handle-http-error'

export function useUpdateProfileStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfileStatus,
    onSuccess: async (_, { isPublicProfile }) => {
      toast.success(
        isPublicProfile
          ? 'Seu perfil agora é público'
          : 'Seu perfil agora é privado',
      )

      queryClient.setQueryData<GetProfileResponse>(
        ['profile'],
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetProfileResponse = {
            user: {
              ...oldQueryData.user,
              isPublicProfile,
            },
          }

          return updatedQueryData
        },
      )
    },
    onError: handleHttpError,
  })
}
