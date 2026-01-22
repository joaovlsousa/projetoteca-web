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
    onSuccess: async (_, { projectId, ...updatedValues }) => {
      toast.success('Projeto atualizado')

      queryClient.setQueryData<GetProjectResponse>(
        ['project', projectId],
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetProjectResponse = {
            project: {
              ...oldQueryData.project,
              ...updatedValues,
              deployUrl: updatedValues.deployUrl ?? null,
              updatedAt: new Date().toISOString(),
            },
          }

          return updatedQueryData
        },
      )

      await queryClient.invalidateQueries({
        queryKey: ['projects'],
        exact: true,
      })

      navigate({ to: '/projects' })
    },
    onError: handleHttpError,
  })
}
