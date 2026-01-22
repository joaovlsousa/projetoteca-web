import { Link } from '@tanstack/react-router'
import { CloudUploadIcon, FileStackIcon, PlusIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MetadataCard } from './metadata-card'
import { ProjectsMetadata } from './projects-metadata'
import { StorageMetadata } from './storage-metadata'

export function MetadataCards() {
  return (
    <>
      <MetadataCard title="Armazenamento utilizado" icon={CloudUploadIcon}>
        <StorageMetadata />
      </MetadataCard>

      <MetadataCard title="Projetos criados" icon={FileStackIcon}>
        <ProjectsMetadata />
      </MetadataCard>

      <Card className="p-0 aspect-video">
        <Link
          to="/projects/create"
          className="h-full flex flex-col items-center justify-center gap-y-4"
        >
          <PlusIcon />
          <span className="font-medium">Criar novo projeto</span>
        </Link>
      </Card>
    </>
  )
}
