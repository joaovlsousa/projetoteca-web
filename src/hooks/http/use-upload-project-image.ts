import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { uploadProjectImage } from '@/http/upload-project-image'
import { queryKeys } from './_query-keys'
import { handleHttpError } from './errors/handle-http-error'

export function useUploadProjectImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadProjectImage,
    onSuccess: async () => {
      toast.success('Imagem do projeto atualizada')

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.getProjects,
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.getStorageMetadata,
        }),
      ])
    },
    onError: handleHttpError,
  })
}
