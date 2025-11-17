import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { editProject } from '@/http/edit-project'
import { handleHttpError } from './errors/handle-http-error'

export function useEditProject() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: editProject,
    onSuccess: (_, { projectId }) => {
      toast.success('Project updated')

      navigate({ to: `/projects/${projectId}/edit/image` })
    },
    onError: handleHttpError,
  })
}
