import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

interface ProjectsFormProps {
  initialValues?: {
    id: string
    name: string
    description: string
    type: 'frontend' | 'backend' | 'fullstack'
    githubUrl: string
    deployUrl?: string
  }
  onSubmit: (values: FormValues) => Promise<void>
}

const formSchema = z
  .object({
    name: z.string('Name is required').min(3),
    description: z.string('Description is required').min(10).max(300),
    type: z.enum(['frontend', 'backend', 'fullstack'], 'Type is required'),
    githubUrl: z.httpUrl('Repository is required'),
    deployUrl: z.string().optional(),
  })
  .superRefine((args, ctx) => {
    if (args.deployUrl) {
      const { success } = z.httpUrl().safeParse(args.deployUrl)

      if (!success) {
        ctx.addIssue({
          code: 'invalid_format',
          format: 'url',
          message: 'Invalid url',
          path: ['deployUrl'],
        })
      }
    } else {
      ctx.value.deployUrl = undefined
    }
  })

export type FormValues = z.infer<typeof formSchema>

export function ProjectsForm({ initialValues, onSubmit }: ProjectsFormProps) {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      githubUrl: initialValues?.githubUrl || '',
      deployUrl: initialValues?.deployUrl || '',
    },
  })

  const descriptionLength = form.watch().description.length

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="My Project" autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={300}
                  className="h-40 resize-none"
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormDescription>Max of 200 characters.</FormDescription>
                <div className="text-sm font-medium text-muted-foreground">
                  <span>{descriptionLength}</span>
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
              <FormLabel htmlFor="type">Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose the type of project" />
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
        <FormField
          name="githubUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="githubUrl">Repository</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/username/project-name"
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                Link for your project repository
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
              <FormLabel htmlFor="deployUrl">Deployment</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://example.com"
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>Link to access your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? (
            <>
              <Loader />
              Creating...
            </>
          ) : (
            'Create'
          )}
        </Button>
      </form>
    </Form>
  )
}
