import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useGetRepositoryBySlug } from '@/hooks/http/use-get-repository-by-slug'
import type { GetRepositoryBySlugResponse } from '@/http/get-repository-by-slug'
import { CreateProjectForm } from './-components/create-project-form'
import { RepositorySlugForm } from './-components/repository-slug-form'

export const Route = createFileRoute('/_app/projects/create/')({
  component: RouteComponent,
})

interface OnSubmitParams {
  slug: string
}

function RouteComponent() {
  const [repositoryResponseData, setRepositoryResponseData] = useState<
    GetRepositoryBySlugResponse['repository']
  >({
    name: '',
    githubUrl: '',
    description: null,
    homepageUrl: null,
    techsIds: [],
  })

  const getRepositoryBySlug = useGetRepositoryBySlug()

  async function onSubmit(params: OnSubmitParams) {
    const { repository } = await getRepositoryBySlug.mutateAsync(params)

    setRepositoryResponseData(repository)
  }

  return (
    <main className="w-full space-y-10">
      <RepositorySlugForm
        isPending={getRepositoryBySlug.isPending}
        onSubmit={onSubmit}
      />

      <CreateProjectForm
        key={repositoryResponseData.githubUrl}
        repository={repositoryResponseData}
        disabled={!repositoryResponseData.githubUrl}
      />
    </main>
  )
}
