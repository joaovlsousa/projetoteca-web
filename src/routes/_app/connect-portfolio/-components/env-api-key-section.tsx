import { GearIcon } from '@phosphor-icons/react'
import { CodeBlock } from '@/components/code-block'
import { Section } from '@/components/section'
import { env } from '@/config/env'

export function EnvApiKeySection() {
  const code = `
    API_BASE_URL=${env.VITE_API_URL}
API_KEY= # Sua Chave de API
  `.trim()

  return (
    <main className="w-full space-y-10">
      <Section
        title="Configure a variável de ambiente"
        description="Utilize variáveis de ambiente para proteger suas chaves de acesso."
        icon={GearIcon}
      >
        <CodeBlock code={code} lang="bash" filename=".env" />
      </Section>
    </main>
  )
}
