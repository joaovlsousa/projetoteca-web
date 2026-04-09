import { KeyIcon } from '@phosphor-icons/react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { queryKeys } from '@/hooks/http/_query-keys'
import { useGenerateApiKey } from '@/hooks/http/use-generate-api-key'
import type { GetApiKeyResponse } from '@/http/get-api-key'

export function GenerateApiKeySection() {
  const queryClient = useQueryClient()
  const generateApiKey = useGenerateApiKey()

  async function handleGenerateApiKey() {
    const data = queryClient.getQueryData<GetApiKeyResponse>(
      queryKeys.getApiKey,
    )

    if (data?.apiKey) {
      toast.info('Você já possui uma Chave de API')
      return
    }

    await generateApiKey.mutateAsync()
  }

  return (
    <main className="w-full space-y-10">
      <Section
        title="Gerar Chave de API"
        description="Gere uma Chave de API (API Key) para obter acesso aos seus projetos."
        icon={KeyIcon}
      >
        <Button
          type="button"
          size="lg"
          className="px-10"
          onClick={handleGenerateApiKey}
          disabled={generateApiKey.isPending}
        >
          {generateApiKey.isPending ? (
            <>
              <Loader />
              <span>Gerando Chave de API...</span>
            </>
          ) : (
            <>
              <KeyIcon className="size-4" />
              <span>Gerar Chave de API</span>
            </>
          )}
        </Button>
      </Section>
    </main>
  )
}
