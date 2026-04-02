import { FileCloudIcon, PlusIcon, StackPlusIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { MetadataCard } from './metadata-card'
import { ProjectsMetadata } from './projects-metadata'
import { StorageMetadata } from './storage-metadata'

export function MetadataCards() {
  return (
    <>
      <Card className="p-0 aspect-video hover:ring-primary transition-all duration-300">
        <Link
          to="/projects/create"
          className="h-full flex flex-col items-center justify-center gap-y-2"
        >
          <PlusIcon className="size-4" weight="bold" />
          <span className="font-semibold">Criar novo projeto</span>
        </Link>
      </Card>

      <MetadataCard title="Armazenamento utilizado" icon={FileCloudIcon}>
        <StorageMetadata />
      </MetadataCard>

      <MetadataCard title="Projetos criados" icon={StackPlusIcon}>
        <ProjectsMetadata />
      </MetadataCard>
    </>
  )
}
