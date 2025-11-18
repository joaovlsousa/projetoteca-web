import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { editProject } from '@/http/edit-project'
import type { GetProjectResponse } from '@/http/get-project'
import { handleHttpError } from './errors/handle-http-error'

export function useEditProject() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editProject,
    onSuccess: async (_, { projectId, ...values }) => {
      toast.success('Project updated')

      queryClient.setQueryData<GetProjectResponse>(
        ['project', projectId],
        (data) => {
          return data
            ? {
                project: {
                  ...data.project,
                  ...values,
                  deployUrl: values.deployUrl ?? null,
                  updatedAt: new Date().toISOString(),
                },
              }
            : data
        },
      )

      await queryClient.invalidateQueries({ queryKey: ['projects'] })

      navigate({ to: `/projects/${projectId}/edit/image` })
    },
    onError: handleHttpError,
  })
}
