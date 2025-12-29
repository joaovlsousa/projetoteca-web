import { CheckIcon, FolderGit2Icon } from 'lucide-react'
import { type FormEvent, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'
import { useGetRepositories } from '@/hooks/http/use-get-repositories'
import { getRepositoryBySlug } from '@/http/get-repository-by-slug'
import { queryClient } from '@/lib/query-client'
import { cn } from '@/lib/utils'

interface RepositoriesFormProps {
  onSubmit: () => void
}

export function RepositoriesForm({ onSubmit }: RepositoriesFormProps) {
  const [currentSlug, setCurrentSlug] = useState<string | null>(
    localStorage.getItem('currentSlug'),
  )
  const [isPending, startTransition] = useTransition()

  const {
    data: { repositories },
  } = useGetRepositories()

  function handleCurrentSlug(slug: string) {
    localStorage.setItem('currentSlug', slug)
    setCurrentSlug(slug)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!currentSlug) {
      return
    }

    startTransition(async () => {
      await queryClient.prefetchQuery({
        queryKey: ['repository', currentSlug],
        queryFn: () => getRepositoryBySlug({ slug: currentSlug }),
      })

      onSubmit()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="max-h-96 overflow-y-auto space-y-2">
        {repositories.map((repository) => (
          <Label
            key={repository.slug}
            htmlFor={repository.slug}
            className={cn(
              'flex items-center gap-x-2 p-2 rounded-lg cursor-pointer transition-colors hover:bg-primary/50',
              currentSlug === repository.slug && 'bg-primary',
            )}
          >
            <FolderGit2Icon className="size-4" />
            {repository.name}
            {currentSlug === repository.slug && (
              <CheckIcon className="size-4" />
            )}

            <input
              type="radio"
              id={repository.slug}
              name="repository"
              value={repository.slug}
              checked={currentSlug === repository.slug}
              onChange={(event) => handleCurrentSlug(event.target.value)}
              className="invisible"
            />
          </Label>
        ))}
      </div>

      <Button
        type="submit"
        disabled={!currentSlug || isPending}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader className="mr-2" />
            <span>Conectando...</span>
          </>
        ) : (
          'Conectar'
        )}
      </Button>
    </form>
  )
}
