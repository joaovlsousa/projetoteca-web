import { api } from '@/lib/axios'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({
  code,
}: SignInWithGithubRequest): Promise<SignInWithGithubResponse> {
  const response = await api.post<SignInWithGithubResponse>(
    '/sessions/github',
    {
      code,
    },
  )
  return response.data
}
