import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/axios'

interface CreateProjectsRequest {
  name: string
  description: string
  type: 'frontend' | 'backend' | 'fullstack'
  githubUrl: string
  deployUrl?: string
}

interface CreateProjectsResponse {
  projectId: string
}

export function useCreateProject() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: CreateProjectsRequest) => {
      const response = await api.post<CreateProjectsResponse>('/projects', {
        ...payload,
      })

      return response.data.projectId
    },
    onSuccess: (projectId) => {
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
