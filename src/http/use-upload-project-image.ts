import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/axios'

interface UploadProjectImageRequest {
  image: File
  projectId: string
}

export function useUploadProjectImage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ image, projectId }: UploadProjectImageRequest) => {
      const formDataToUpload = new FormData()
      formDataToUpload.append('file', image)

      await api.patch(`/projects/${projectId}/upload`, formDataToUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate({ to: `/projects` })
    },
    onError: (error) => {
      let message = 'Something went wrong'

      if (error instanceof AxiosError) {
        message = error.response?.data.message
      }

      toast.error(message)
    },
  })
}
