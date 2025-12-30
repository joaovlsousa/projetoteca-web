import { api } from '@/lib/axios'

export interface GetTechsResponse {
  techs: {
    id: string
    name: string
    imageUrl: string
  }[]
}

export async function getTechs(): Promise<GetTechsResponse> {
  const response = await api.get<GetTechsResponse>('/techs')

  return response.data
}
