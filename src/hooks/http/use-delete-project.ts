import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteProject } from '@/http/delete-project'
import type { GetProjectsResponse } from '@/http/get-projects'
import { handleHttpError } from './errors/handle-http-error'

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: async (_, { projectId }) => {
      toast.success('Projeto excluído')

      queryClient.setQueryData<GetProjectsResponse>(['projects'], (data) => {
        if (!data) return data

        const projectsCache = data.projects.filter(
          (project) => project.id !== projectId,
        )

        return {
          projects: projectsCache,
        }
      })

      await queryClient.invalidateQueries({
        queryKey: ['projects', 'metadata'],
      })
    },
    onError: handleHttpError,
  })
}
