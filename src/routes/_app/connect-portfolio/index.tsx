import { createFileRoute } from '@tanstack/react-router'
import { EnvApiKeySection } from './-components/env-api-key-section'
import { ExampleApiKeySection } from './-components/example-api-key-section copy'
import { GenerateApiKeySection } from './-components/generate-api-key-section'
import { GetApiKeySection } from './-components/get-api-key-section'

export const Route = createFileRoute('/_app/connect-portfolio/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full space-y-10">
      <GenerateApiKeySection />
      <GetApiKeySection />
      <EnvApiKeySection />
      <ExampleApiKeySection />
    </main>
  )
}
