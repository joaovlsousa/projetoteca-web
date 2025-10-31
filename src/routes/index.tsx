import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Activity } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      )
      const data = await response.json()

      return data
    },
  })

  return (
    <div className="min-h-screen">
      {isLoading && <span>carregando...</span>}

      <Activity mode={isLoading ? 'hidden' : 'visible'}>
        <div className="max-w-3xs">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </Activity>
    </div>
  )
}
