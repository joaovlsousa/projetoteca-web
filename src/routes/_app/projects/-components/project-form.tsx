import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
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
  onSubmit: (values: FormValues) => Promise<void>
  onPrevious?: () => void
}

export function ProjectForm({
  initialValues,
  onSubmit,
  onPrevious,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Meu Projeto"
                  autoComplete="off"
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormDescription>Máx. de 50 caracteres</FormDescription>
                <div className="text-sm font-medium text-muted-foreground">
                  <span>{watchedName.length}</span>
                  <span> / 50</span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={300}
                  spellCheck="false"
                  className="h-40 resize-none"
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormDescription>Máx. de 300 caracteres</FormDescription>
                <div className="text-sm font-medium text-muted-foreground">
                  <span>{watchedDescription.length}</span>
                  <span> / 300</span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Tipo</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Escolher tipo de projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Front-end</SelectItem>
                    <SelectItem value="backend">Back-end</SelectItem>
                    <SelectItem value="fullstack">Full-stack</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Tecnologias</FormLabel>
          <FormDescription>
            Selecione até 10 tecnologias utilizadas no projeto
          </FormDescription>

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
                  onChange={handleCheck}
                  className="invisible"
                />
              </label>
            ))}
          </div>
        </FormItem>
        <FormField
          name="githubUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="githubUrl">Repositório</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/usuario/projeto"
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                Link para seu repositório do github
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="deployUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="deployUrl">Página do app</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://example.com"
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                Link para acessar sua aplicação (Opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          {onPrevious && (
            <Button
              type="button"
              onClick={onPrevious}
              disabled={form.formState.isSubmitting}
              variant="secondary"
            >
              Voltar
            </Button>
          )}

          <Button
            disabled={form.formState.isSubmitting}
            className={cn(onPrevious ? 'w-1/2' : 'w-full')}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader />
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
