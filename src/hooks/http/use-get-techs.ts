import { useSuspenseQuery } from '@tanstack/react-query'
import { getTechs } from '@/http/get-techs'
import { queryKeys } from './_query-keys'

export function useGetTechs() {
  return useSuspenseQuery({
    queryKey: queryKeys.getTechs,
    queryFn: getTechs,
  })
}
