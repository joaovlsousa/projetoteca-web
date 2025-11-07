import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface GetProfileResponse {
  name: string
  username: string
  avatarUrl: string
}

export function useGetProfile() {
  return useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<GetProfileResponse>('/profile')

      return response.data
    },
  })
}
