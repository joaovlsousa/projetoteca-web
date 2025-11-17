import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteProject } from '@/http/delete-project'
import { handleHttpError } from './errors/handle-http-error'

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })

      toast.success('Project deleted')
    },
    onError: handleHttpError,
  })
}
