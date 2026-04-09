import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Section } from '@/components/section'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Loader } from '@/components/ui/loader'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useDeleteApiKey } from '@/hooks/http/use-delete-api-key'
import { useGetApiKey } from '@/hooks/http/use-get-api-key'

export function GetApiKeySection() {
  const {
    data: { apiKey },
  } = useGetApiKey()
  const deleteApiKey = useDeleteApiKey()

  async function handleCopyApiKey() {
    await window.navigator.clipboard.writeText(apiKey ?? '')

    toast.success(
      'A Chave de API foi copiada para a sua Área de Transferência.',
    )
  }

  async function handleDeleteApiKey() {
    await deleteApiKey.mutateAsync()
  }

  return (
    <main className="w-full space-y-10">
      <Section
        title="Obter Chave de API"
        description="Aqui você poderá gerenciar sua Chave de API."
        icon={CopyIcon}
        aria-disabled={!apiKey}
      >
        <Field>
          <FieldLabel>Chave de API</FieldLabel>
          <InputGroup>
            <InputGroupInput
              value={apiKey ?? ''}
              type="password"
              disabled
              className="disabled:opacity-100"
            />

            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleCopyApiKey}
                  >
                    <CopyIcon className="size-5" />
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent>Copiar Chave de API</TooltipContent>
              </Tooltip>
            </InputGroupAddon>

            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    variant="destructive"
                    size="icon-sm"
                    onClick={handleDeleteApiKey}
                    disabled={deleteApiKey.isPending}
                  >
                    {deleteApiKey.isPending ? (
                      <Loader />
                    ) : (
                      <TrashIcon className="size-5" />
                    )}
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent>Excluir Chave de API</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </Section>
    </main>
  )
}
