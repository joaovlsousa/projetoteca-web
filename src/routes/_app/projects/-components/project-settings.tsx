import { Link } from '@tanstack/react-router'
import {
  CalendarIcon,
  ImageUpIcon,
  PenIcon,
  RefreshCwIcon,
  SettingsIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from '@/lib/date-fns'
import { DeleteProjectAlert } from './delete-project-alert'
import { UploadProjectImageModal } from './upload-project-image-modal'

interface ProjectSettingsProps {
  projectId: string
  createdAt: string
  updatedAt?: string | null
}

export function ProjectSettings({
  projectId,
  createdAt,
  updatedAt,
}: ProjectSettingsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full group">
          <SettingsIcon className="size-5 group-hover:rotate-12 transition duration-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="max-w-56 p-2 space-y-1.5">
        <Link to="/projects/$projectId/edit" params={{ projectId }}>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start font-normal"
          >
            <PenIcon className="size-3 mr-1" />
            Atualizar projeto
          </Button>
        </Link>

        <UploadProjectImageModal projectId={projectId}>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start font-normal"
          >
            <ImageUpIcon className="size-3 mr-1" />
            Atualizar imagem
          </Button>
        </UploadProjectImageModal>

        <DropdownMenuSeparator />

        <DeleteProjectAlert projectId={projectId} />

        <DropdownMenuGroup className="px-2 mt-2 space-y-1.5">
          <div className="flex itens-center gap-x-2 text-xs text-muted-foreground italic">
            <CalendarIcon className="size-3.5" />
            <span>Criado {formatDistanceToNow(createdAt)}</span>
          </div>

          {updatedAt && (
            <div className="flex itens-center gap-x-2 text-xs text-muted-foreground italic">
              <RefreshCwIcon className="size-3.5" />
              <span>Atualizado {formatDistanceToNow(updatedAt)}</span>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
