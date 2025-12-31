import { type ReactNode, useState, useTransition } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Loader } from './ui/loader'

interface AlertDialogProps {
  title: string
  description: string
  children: ReactNode
  onConfirm: () => Promise<void>
}

export function AlertDialog({
  children,
  description,
  onConfirm,
  title,
}: AlertDialogProps) {
  const [isLoading, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  async function handleConfirm() {
    startTransition(async () => {
      await onConfirm()

      setIsOpen(false)
    })
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            asChild
            variant="ghost"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            <DialogClose>Cancelar</DialogClose>
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            {isLoading ? <Loader /> : 'Continuar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
