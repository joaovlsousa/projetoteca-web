import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { uploadProjectImage } from '@/http/upload-project-image'
import { handleHttpError } from './errors/handle-http-error'

export function useUploadProjectImage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadProjectImage,
    onSuccess: async () => {
      toast.success('Project image updated')

      await queryClient.invalidateQueries({ queryKey: ['projects'] })

      navigate({ to: `/projects` })
    },
    onError: handleHttpError,
  })
}
