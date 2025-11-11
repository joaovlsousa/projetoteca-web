import { createFileRoute } from '@tanstack/react-router'
import { UploadProjectImageForm } from './-components/upload-project-image-form'

export const Route = createFileRoute('/_app/projects/$projectId/edit/image/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <h2 className="text-xl font-medium">Update project image</h2>

      <div className="w-full max-w-lg">
        <UploadProjectImageForm />
      </div>
    </div>
  )
}
