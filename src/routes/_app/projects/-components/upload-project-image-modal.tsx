import { type ReactNode, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UploadProjectImageForm } from './upload-project-image-form'

interface UploadProjectImageModalProps {
  projectId: string
  children: ReactNode
}

export function UploadProjectImageModal({
  projectId,
  children,
}: UploadProjectImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  function onFormSubmitted() {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl space-y-5">
        <DialogHeader>
          <DialogTitle className="text-center">
            Atualizar imagem do projeto
          </DialogTitle>
        </DialogHeader>
        <UploadProjectImageForm
          projectId={projectId}
          onFormSubmitted={onFormSubmitted}
        />
      </DialogContent>
    </Dialog>
  )
}
