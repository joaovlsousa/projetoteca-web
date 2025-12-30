import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Suspense, useEffect, useState } from 'react'
import { ProjectFormSkeleton } from '../-components/project-form-skeleton'
import { CreateProjectForm } from './-components/create-project-form'
import { RepositoriesForm } from './-components/repositories-form'
import { RepositoriesFormSkeleton } from './-components/repositories-form-skeleton'

export const Route = createFileRoute('/_app/projects/create/')({
  component: RouteComponent,
})

const titlesByStep = [
  'Conecte seu repositório do github',
  'Detalhe seu projeto',
]

function RouteComponent() {
  const [step, setStep] = useState<number>(0)

  function handleDecrementStep() {
    if (step !== 1) {
      return
    }

    setStep(step - 1)
  }

  function handleIncrementStep() {
    if (step !== 0) {
      return
    }

    setStep(step + 1)
  }

  useEffect(() => {
    return () => {
      localStorage.removeItem('currentSlug')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <AnimatePresence mode="wait">
        <motion.h2
          key={step}
          className="text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {titlesByStep[step]}
        </motion.h2>
      </AnimatePresence>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="repositories-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<RepositoriesFormSkeleton />}>
                <RepositoriesForm onSubmit={handleIncrementStep} />
              </Suspense>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="project-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<ProjectFormSkeleton />}>
                <CreateProjectForm onPrevious={handleDecrementStep} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
