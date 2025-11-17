import { createFileRoute } from '@tanstack/react-router'
import { GithubIcon } from 'lucide-react'
import { useEffect } from 'react'
import { z } from 'zod'
import { useSignInWithGithub } from '@/hooks/http/use-sign-in-with-github'

const searchParamsSchema = z.object({
  code: z.string().default(''),
})

export const Route = createFileRoute('/auth/callback/github')({
  validateSearch: searchParamsSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { code } = Route.useSearch()

  const {
    mutateAsync: signInWithGithub,
    isPending,
    isSuccess,
  } = useSignInWithGithub()

  useEffect(() => {
    async function signIn() {
      if (code && !isPending && !isSuccess) {
        await signInWithGithub({ code })
      }
    }

    signIn()
  }, [code, isPending, isSuccess, signInWithGithub])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="p-4 rounded-full bg-zinc-800 animate-bounce">
        <GithubIcon className="size-10" />
      </div>

      <p className="font-medium text-muted-foreground tracking-wide animate-pulse">
        {isPending ? 'Searching for data...' : 'Redirecting...'}
      </p>
    </main>
  )
}
