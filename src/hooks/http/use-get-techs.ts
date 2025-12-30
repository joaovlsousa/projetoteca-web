import { useSuspenseQuery } from '@tanstack/react-query'
import { getTechs } from '@/http/get-techs'

export function useGetTechs() {
  return useSuspenseQuery({
    queryKey: ['techs'],
    queryFn: getTechs,
  })
}
