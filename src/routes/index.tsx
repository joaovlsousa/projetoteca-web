import { ArrowRightIcon } from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
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
    <div className="min-h-screen bg-linear-to-b to-muted from-background">
      <main className="max-w-5xl mx-auto space-y-14 py-24">
        <section className="space-y-8 max-w-xl mx-auto">
          <header className="flex items-center justify-center">
            <Logo />
          </header>
          <div className="space-y-6">
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center text-7xl font-bold"
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
              className="text-justify text-lg text-muted-foreground"
            >
              Conecte seus repositórios do GitHub, selecione seus melhores
              trabalhos e transforme-os em um portfólio incrível. Compartilhe
              sua galeria publicamente ou integre-a ao seu próprio site.
            </motion.p>
          </div>

          <div className="flex items-center justify-center">
            {token ? (
              <Link to="/projects">
                <Button size="lg" className="px-10">
                  Ir para a galeria
                  <ArrowRightIcon className="size-4" />
                </Button>
              </Link>
            ) : (
              <SignInWithGithubButton />
            )}
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-linear-to-t to-muted from-background">
          <img
            src="./app.png"
            alt="Imagem do app"
            loading="eager"
            className="w-full aspect-video rounded-lg"
          />
        </section>
      </main>
    </div>
  )
}
