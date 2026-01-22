import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { createProject } from '@/http/create-project'
import type { GetProjectsMetadataResponse } from '@/http/get-projects-metadata'
import { handleHttpError } from './errors/handle-http-error'

export function useCreateProject() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      toast.success('Projeto criado')

      queryClient.setQueryData<GetProjectsMetadataResponse>(
        ['projects', 'metadata'],
        (oldQueryData) => {
          if (!oldQueryData) {
            return oldQueryData
          }

          const updatedQueryData: GetProjectsMetadataResponse = {
            metadata: {
              totalOfProjectsByUser:
                oldQueryData.metadata.totalOfProjectsByUser,
              countProjects: oldQueryData.metadata.countProjects + 1,
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
