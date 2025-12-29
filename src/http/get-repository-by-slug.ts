import { api } from '@/lib/axios'

export interface GetRepositoryBySlugRequest {
  slug: string
}

export interface GetRepositoryBySlugResponse {
  repository: {
    name: string
    description: string | null
    homepageUrl: string | null
    githubUrl: string
    techId: string | null
  }
}

export async function getRepositoryBySlug({
  slug,
}: GetRepositoryBySlugRequest): Promise<GetRepositoryBySlugResponse> {
  const response = await api.get<GetRepositoryBySlugResponse>(`/repos/${slug}`)

  return response.data
}
