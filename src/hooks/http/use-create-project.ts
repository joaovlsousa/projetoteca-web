import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { createProject } from '@/http/create-project'
import { handleHttpError } from './errors/handle-http-error'

export function useCreateProject() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      toast.success('Project created')

      await queryClient.invalidateQueries({ queryKey: ['projects'] })

      navigate({ to: '/projects' })
    },
    onError: handleHttpError,
  })
}
