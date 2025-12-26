import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { Logo } from '@/components/logo'
import { SignInWithGithubButton } from '@/components/sign-in-with-github-button'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { token } = useAuth()

  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center space-y-16">
        <div className="py-0.5 px-6 rounded-full bg-secondary ring-2 ring-primary">
          <Logo />
        </div>

        <div className="max-w-4xl space-y-6 text-center">
          <h1 className="text-6xl font-medium leading-snug tracking-tight">
            Seus projetos <br /> organizados com perfeição
          </h1>
          <p className="max-w-2xl mx-auto text-justify text-muted-foreground">
            Conecte seus repositórios do GitHub, selecione seus melhores
            trabalhos e transforme-os em um portfólio incrível. Compartilhe sua
            galeria publicamente ou integre-a ao seu próprio site via API.
          </p>
        </div>

        <div className="flex items-center justify-center gap-x-6">
          {token ? (
            <Link to="/projects">
              <Button size="lg">
                Ir para a galeria
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
          ) : (
            <SignInWithGithubButton />
          )}

          <a href="#gallery">
            <Button size="lg" variant="secondary">
              Ver demonstração
            </Button>
          </a>
        </div>
      </section>

      {/* TODO: Add app screen */}
      <section
        id="gallery"
        className="w-full bg-zinc-900 aspect-video rounded-md shadow-lg shadow-black/10 ring ring-black/10"
      />
      {/* <img
        src="/app-screen.webp"
        alt="App screen"
        className="w-full aspect-video rounded-md shadow-lg shadow-black/10 ring ring-black/10"
      /> */}
    </main>
  )
}
