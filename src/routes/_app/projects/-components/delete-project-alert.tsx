import { Trash } from 'lucide-react'
import { AlertDialog } from '@/components/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteProject } from '@/http/use-delete-project'

interface DeleteProjectAlertProps {
  projectId: string
}

export function DeleteProjectAlert({ projectId }: DeleteProjectAlertProps) {
  const deleteProject = useDeleteProject()

  async function handleDeleteProject() {
    await deleteProject.mutateAsync({ projectId })
  }

  return (
    <AlertDialog
      title="Delete project?"
      description="You will not be able to undo this action later."
      onConfirm={handleDeleteProject}
    >
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-red-500 hover:text-red-600"
      >
        <Trash className="size-3 mr-2" />
        Delete project
      </Button>
    </AlertDialog>
  )
}
