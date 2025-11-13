import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { UploadProjectImageForm } from './-components/upload-project-image-form'

export const Route = createFileRoute('/_app/projects/$projectId/edit/image/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useParams()

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="w-full max-w-lg flex items-center justify-between">
        <Link
          to="/projects/$projectId/edit"
          params={{ projectId }}
          className="flex items-center gap-x-1.5 text-sm text-primary"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Back</span>
        </Link>

        <h2 className="text-xl font-medium">Update project image</h2>

        <Link
          to="/projects"
          className="flex items-center gap-x-1.5 text-sm text-primary"
        >
          <span>Skip</span>
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="w-full max-w-lg">
        <UploadProjectImageForm />
      </div>
    </div>
  )
}
