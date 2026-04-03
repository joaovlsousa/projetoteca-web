import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { FloppyDiskIcon } from '@phosphor-icons/react'
import { type ChangeEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Loader } from '@/components/ui/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetTechs } from '@/hooks/http/use-get-techs'
import { cn } from '@/lib/utils'

const formSchema = z
  .object({
    name: z.string('Campo obrigatório').min(3, 'Mín. de 3 caracteres'),
    description: z
      .string('Campo obrigatório')
      .min(10, 'Mín. de 10 caracteres')
      .max(300, 'Max. de 300 caracteres'),
    type: z.enum(['frontend', 'backend', 'fullstack'], 'Campo obrigatório'),
    githubUrl: z.httpUrl('Campo obrigatório'),
    deployUrl: z.string().optional(),
  })
  .superRefine((args, ctx) => {
    if (args.deployUrl) {
      const { success } = z.httpUrl().safeParse(args.deployUrl)

      if (!success) {
        ctx.addIssue({
          code: 'invalid_format',
          format: 'url',
          message: 'Url inválida',
          path: ['deployUrl'],
        })
      }
    } else {
      ctx.value.deployUrl = undefined
    }

    ctx.value.description = args.description.trim()
  })

type FormValues = z.infer<typeof formSchema> & {
  techsIds: string[]
}

interface ProjectFormProps {
  initialValues: {
    name: string
    description?: string | null
    type?: 'frontend' | 'backend' | 'fullstack'
    githubUrl?: string | null
    deployUrl?: string | null
    techsIds?: string[]
  }
  onSubmit: (values: FormValues) => Promise<void> | void
  disabled?: boolean
}

export function ProjectForm({
  initialValues,
  onSubmit,
  disabled,
}: ProjectFormProps) {
  const {
    data: { techs },
  } = useGetTechs()

  const [techsIdsCheckedList, setTechsIdsCheckedList] = useState<string[]>(
    initialValues.techsIds ?? [],
  )

  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: initialValues.name,
      description: initialValues.description || '',
      type: initialValues.type,
      githubUrl: initialValues.githubUrl || '',
      deployUrl: initialValues.deployUrl || '',
    },
  })

  const { name: watchedName, description: watchedDescription } = form.watch()

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked && techsIdsCheckedList.length >= 10) {
      event.target.checked = false

      return
    }

    if (event.target.checked) {
      setTechsIdsCheckedList((prev) => [...prev, event.target.value])

      return
    }

    setTechsIdsCheckedList((prev) =>
      prev.filter((techId) => techId !== event.target.value),
    )
  }

  async function handleSubmit(values: FormValues) {
    const valuesWithTechs: FormValues = {
      ...values,
      techsIds: techsIdsCheckedList,
    }

    await onSubmit(valuesWithTechs)
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn(
        'space-y-6 max-w-2/3 transition-opacity duration-200',
        disabled && 'opacity-20',
      )}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  disabled={form.formState.isSubmitting || disabled}
                  maxLength={50}
                  placeholder="Meu Projeto"
                  autoComplete="off"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>{watchedName.length}/50</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Tamanho máximo de 50 caracteres.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  disabled={form.formState.isSubmitting || disabled}
                  maxLength={300}
                  spellCheck="false"
                  className="h-40 resize-none"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>
                    {watchedDescription.length}/300
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Tamanho máximo de 300 caracteres.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Tipo</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolher tipo de projeto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Front-end</SelectItem>
                  <SelectItem value="backend">Back-end</SelectItem>
                  <SelectItem value="fullstack">Full-stack</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <FieldLabel>Tecnologias</FieldLabel>
          <FieldDescription>
            Selecione até 10 tecnologias utilizadas no projeto.
          </FieldDescription>

          <div className="flex flex-wrap itens-center gap-1.5">
            {techs.map((tech) => (
              <label key={tech.id} htmlFor={tech.id}>
                <Badge
                  variant={
                    techsIdsCheckedList.includes(tech.id)
                      ? 'default'
                      : 'secondary'
                  }
                  className="gap-x-2 cursor-pointer transition-colors"
                >
                  <img src={tech.imageUrl} alt={tech.name} className="size-3" />
                  <span>{tech.name}</span>
                </Badge>
                <input
                  type="checkbox"
                  id={tech.id}
                  value={tech.id}
                  defaultChecked={techsIdsCheckedList.includes(tech.id)}
                  onChange={handleCheck}
                  className="invisible"
                />
              </label>
            ))}
          </div>

          <FieldDescription>
            Tecnologias selecionadas:{' '}
            <span className="text-foreground">
              {techsIdsCheckedList.length}/10
            </span>
          </FieldDescription>
        </Field>
        <Controller
          name="githubUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="githubUrl">Repositório</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                disabled
                placeholder="https://github.com/usuario/projeto"
                autoComplete="off"
              />
              <FieldDescription>
                Link para seu repositório do github
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="deployUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="deployUrl">Página do app</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting || disabled}
                placeholder="https://example.com"
                autoComplete="off"
              />
              <FieldDescription>
                Link para acessar sua aplicação (Opcional)
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button size="lg" disabled={form.formState.isSubmitting || disabled}>
        {form.formState.isSubmitting ? (
          <>
            <Loader />
            <span>Salvando projeto...</span>
          </>
        ) : (
          <>
            <FloppyDiskIcon className="size-4" />
            <span>Salvar projeto</span>
          </>
        )}
      </Button>
    </form>
  )
}
