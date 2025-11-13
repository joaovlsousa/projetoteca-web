import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/axios'

interface DeleteProjectRequest {
  projectId: string
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ projectId }: DeleteProjectRequest) => {
      await api.delete(`/projects/${projectId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project deleted')
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
