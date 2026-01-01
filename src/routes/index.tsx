import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
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
    <main className="min-h-screen pl-10 bg-linear-to-b to-muted from-background overflow-hidden">
      <header className="h-16 flex items-center">
        <Logo />
      </header>
      <section className="h-[calc(100vh-4rem)] flex items-center">
        <div className="w-1/2 space-y-8">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md text-balance text-6xl font-medium"
          >
            Seus projetos{' '}
            <span className="bg-linear-to-b from-primary to-primary/35 bg-clip-text text-transparent">
              organizados
            </span>{' '}
            com perfeição
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-balance text-muted-foreground"
          >
            Conecte seus repositórios do GitHub, selecione seus melhores
            trabalhos e transforme-os em um portfólio incrível. Compartilhe sua
            galeria publicamente ou integre-a ao seu próprio site.
          </motion.p>

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
        </div>

        <div className="w-1/2 h-full relative">
          <div className="perspective-near absolute -right-6 bottom-16 left-0 top-32">
            <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-2xl before:border">
              <div className="bg-background rounded-lg shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                <img
                  src="logo.svg"
                  alt="Imagem do app"
                  className="object-top-left size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
