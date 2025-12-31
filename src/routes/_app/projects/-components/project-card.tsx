import { GithubIcon, LinkIcon, PlusIcon, ScanSearchIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ProjectSettings } from './project-settings'
import { UploadProjectImageModal } from './upload-project-image-modal'

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    type: 'frontend' | 'backend' | 'fullstack'
    techs: {
      id: string
      name: string
      imageUrl: string
    }[]
    imageUrl: string | null
    githubUrl: string
    deployUrl: string | null
    createdAt: string
    updatedAt: string | null
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col p-0 space-y-2 pb-3 rounded-md border-0 shadow-none overflow-hidden">
      <CardContent className="px-0 flex-1 space-y-2">
        {project.imageUrl ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative group cursor-pointer">
                <img
                  src={project.imageUrl}
                  alt="Imagem do projeto"
                  className="aspect-video rounded-t-md"
                />

                <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/20 transition-all duration-300">
                  <ScanSearchIcon />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="p-0 max-w-5xl">
              <DialogTitle className="hidden" />
              <img
                src={project.imageUrl}
                alt="Imagem do projeto"
                className="aspect-video rounded-md"
              />
            </DialogContent>
          </Dialog>
        ) : (
          <UploadProjectImageModal projectId={project.id}>
            <div className="w-full flex items-center justify-center gap-2 rounded-t-md bg-secondary aspect-video cursor-pointer">
              <PlusIcon className="size-4 text-muted-foreground" />

              <span className="text-sm font-medium text-muted-foreground">
                Toque para adicionar uma imagem
              </span>
            </div>
          </UploadProjectImageModal>
        )}

        <div className="flex-1 px-2.5 space-y-1">
          <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground text-justify">
            {project.description}
          </CardDescription>

          <div className="flex flex-wrap itens-center mt-3 gap-1.5">
            {project.techs.map((tech) => (
              <Badge key={tech.id} variant="secondary" className="gap-x-2">
                <img src={tech.imageUrl} alt={tech.name} className="size-3" />
                <span>{tech.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-2.5 flex items-center justify-end gap-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="secondary"
                size="icon"
                className="rounded-full"
              >
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <GithubIcon className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Repositório do github</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {project.deployUrl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <a href={project.deployUrl} target="_blank" rel="noreferrer">
                    <LinkIcon className="size-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Acessar projeto</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <ProjectSettings
          projectId={project.id}
          createdAt={project.createdAt}
          updatedAt={project.updatedAt}
        />
      </CardFooter>
    </Card>
  )
}
