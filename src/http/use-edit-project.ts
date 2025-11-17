import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/axios'

interface EditProjectsRequest {
  projectId: string
  name: string
  description: string
  type: 'frontend' | 'backend' | 'fullstack'
  githubUrl: string
  deployUrl?: string
}

export function useEditProject() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ projectId, ...payload }: EditProjectsRequest) => {
      await api.put<void>(`/projects/${projectId}`, {
        ...payload,
      })
    },
    onSuccess: (projectId) => {
      toast.success('Project updated')
      navigate({ to: `/projects/${projectId}/edit/image` })
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
