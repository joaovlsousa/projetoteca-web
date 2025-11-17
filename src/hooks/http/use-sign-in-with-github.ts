import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/use-auth'
import { getProjects } from '@/http/get-projects'
import { signInWithGithub } from '@/http/sign-in-with-github'
import { handleHttpError } from './errors/handle-http-error'

export function useSignInWithGithub() {
  const { saveToken } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signInWithGithub,
    onSuccess: async ({ token }) => {
      saveToken(token)

      await queryClient.prefetchQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
      })

      navigate({ to: '/projects' })
    },
    onError: (error) => {
      handleHttpError(error)
      navigate({ to: '/' })
    },
  })
}
