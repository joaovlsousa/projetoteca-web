import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { uploadProjectImage } from '@/http/upload-project-image'
import { handleHttpError } from './errors/handle-http-error'

export function useUploadProjectImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadProjectImage,
    onSuccess: async () => {
      toast.success('Imagem do projeto atualizada')

      await queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: handleHttpError,
  })
}
