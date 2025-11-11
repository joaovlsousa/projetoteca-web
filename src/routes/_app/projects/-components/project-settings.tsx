import { Link } from '@tanstack/react-router'
import { ImageUpIcon, PenIcon, SettingsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ProjectSettingsProps {
  projectId: string
}

export function ProjectSettings({ projectId }: ProjectSettingsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <SettingsIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-44 space-y-1.5">
        <Link to="/projects/$projectId/edit" params={{ projectId }}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <PenIcon className="size-3 mr-2" />
            Update project
          </Button>
        </Link>
        <Link to="/projects/$projectId/edit/image" params={{ projectId }}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <ImageUpIcon className="size-3 mr-2" />
            Update image
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
