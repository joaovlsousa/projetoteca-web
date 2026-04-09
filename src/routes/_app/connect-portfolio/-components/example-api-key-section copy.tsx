import { CodeIcon } from '@phosphor-icons/react'
import { jwtDecode } from 'jwt-decode'
import { CodeBlock } from '@/components/code-block'
import { Section } from '@/components/section'
import { useAuth } from '@/hooks/use-auth'

export function ExampleApiKeySection() {
  const { token } = useAuth()
  if (!token) {
    throw new Error('Token is required')
  }

  const { username } = jwtDecode<{ username: string }>(token)

  const code = `
    interface GetProjectsResponse {
  projects: {
    id: string
    name: string
    description: string
    type: 'frontend' | 'backend' | 'fullstack'
    techs: {
      id: string
      name: string
      imageUrl: string
    }[]
    imageUrl: string | null
    githubUrl: string
    deployUrl: string | null
    createdAt: string
    updatedAt: string | null
  }[]
}

export async function getProjects(): Promise<GetProjectsResponse> {
  const apiBaseUrl = process.env.API_BASE_URL
  const apiKey = process.env.API_KEY

  const response = await fetch(
    apiBaseUrl+'/public/projects/${username}?apiKey='+apiKey
  )

  const data: GetProjectsResponse = await response.json()

  return data
}
  `.trim()

  return (
    <main className="w-full space-y-10">
      <Section
        title="Exemplo de código para buscar os dados"
        description="Utilize este código como exemplo para buscar os dados da API."
        icon={CodeIcon}
      >
        <CodeBlock code={code} lang="typescript" filename="get-projects.ts" />
      </Section>
    </main>
  )
}
