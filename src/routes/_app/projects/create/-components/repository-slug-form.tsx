import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { GitMergeIcon, PlugsIcon } from '@phosphor-icons/react'
import { jwtDecode } from 'jwt-decode'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Loader } from '@/components/ui/loader'
import { useAuth } from '@/hooks/use-auth'

const formSchema = z.object({
  slug: z
    .string('Digite uma slug válida')
    .max(50, 'Tamanho de slug inválido')
    .regex(/^[A-Za-z0-9]+[A-Za-z0-9_-]+$/, 'Digite uma slug válida'),
})

type FormSchema = z.infer<typeof formSchema>

interface RepositorySlugFormProps {
  onSubmit: (values: FormSchema) => void | Promise<void>
  isPending: boolean
}

export function RepositorySlugForm({
  onSubmit,
  isPending,
}: RepositorySlugFormProps) {
  const { token } = useAuth()

  if (!token) {
    throw new Error('Token is required')
  }

  const { username } = jwtDecode<{ username: string }>(token)

  const form = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    mode: 'onTouched',
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full p-6 space-y-6 rounded-lg bg-sidebar"
    >
      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} aria-disabled={isPending}>
            <FieldLabel htmlFor="slug">Slug do projeto</FieldLabel>
            <InputGroup className="max-w-2/3">
              <InputGroupInput
                {...field}
                aria-invalid={fieldState.invalid}
                id="slug"
                placeholder="my-project"
                autoComplete="off"
              />
              <InputGroupAddon>
                <InputGroupText>https://github.com/{username}/</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <GitMergeIcon />
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Informe o nome (slug) que você usou ao criar seu projeto no
              Github. <br />
              <span className="text-foreground">Dica:</span> Ao acessar o seu
              repositório, copie o slug que aparacerá logo após seu username na
              URL do seu navegador.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <Loader />
            <span>Conectando projeto...</span>
          </>
        ) : (
          <>
            <PlugsIcon />
            <span>Conectar projeto</span>
          </>
        )}
      </Button>
    </form>
  )
}
