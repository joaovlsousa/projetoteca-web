import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { EnvApiKeySection } from './-components/env-api-key-section'
import { ExampleApiKeySection } from './-components/example-api-key-section copy'
import { GenerateApiKeySection } from './-components/generate-api-key-section'
import { GetApiKeySection } from './-components/get-api-key-section'
import { GetApiKeySkeleton } from './-components/get-api-key-skeleton'

export const Route = createFileRoute('/_app/connect-portfolio/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full space-y-10">
      <GenerateApiKeySection />
      <Suspense fallback={<GetApiKeySkeleton />}>
        <GetApiKeySection />
      </Suspense>
      <EnvApiKeySection />
      <ExampleApiKeySection />
    </main>
  )
}
