import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getRepositoryBySlug } from '@/http/get-repository-by-slug'
import { handleHttpError } from './errors/handle-http-error'

export function useGetRepositoryBySlug() {
  return useMutation({
    mutationFn: getRepositoryBySlug,
    onSuccess: () => {
      toast.success('Repositório conectado')
    },
    onError: handleHttpError,
  })
}
