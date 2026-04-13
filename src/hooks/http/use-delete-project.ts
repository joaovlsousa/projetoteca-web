import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteProject } from '@/http/delete-project'
import type { GetProjectsResponse } from '@/http/get-projects'
import type { GetProjectsMetadataResponse } from '@/http/get-projects-metadata'
import { queryKeys } from './_query-keys'
import { handleHttpError } from './errors/handle-http-error'

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: async (_, { projectId }) => {
      toast.success('Projeto excluído')

      queryClient.setQueryData<GetProjectsResponse>(
        queryKeys.getProjects,
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData = oldQueryData.projects.filter(
            (project) => project.id !== projectId,
          )

          return {
            projects: updatedQueryData,
          }
        },
      )

      queryClient.setQueryData<GetProjectsMetadataResponse>(
        queryKeys.getProjectsMetadata,
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData

          const updatedQueryData: GetProjectsMetadataResponse = {
            metadata: {
              totalOfProjectsByUser:
                oldQueryData.metadata.totalOfProjectsByUser,
              countProjects: oldQueryData.metadata.countProjects - 1,
            },
          }

          return updatedQueryData
        },
      )

      await queryClient.invalidateQueries({
        queryKey: queryKeys.getStorageMetadata,
      })
    },
    onError: handleHttpError,
  })
}
