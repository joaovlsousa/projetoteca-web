import { Link } from '@tanstack/react-router'
import { CloudUploadIcon, FileStackIcon, PlusIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetProjectsMetadata } from '@/hooks/http/use-get-projects-metadata'
import { cn } from '@/lib/utils'

export function MetadataCards() {
  const {
    data: { metadata },
  } = useGetProjectsMetadata()

  function formatBytesToMegabytes(bytes: number): number {
    const megabytes = bytes / (1024 * 1024)

    return Number(megabytes.toFixed(3))
  }

  const countStorageInMegabytes = formatBytesToMegabytes(
    metadata.countStorageInBytes,
  )
  const totalStorageInMegabytes = formatBytesToMegabytes(
    metadata.totalStorageInBytes,
  )

  const levelStorage = totalStorageInMegabytes - countStorageInMegabytes
  const levelProjects = metadata.totalProjects - metadata.countProjects

  return (
    <section className="grid grid-cols-3 gap-6">
      <Card className="aspect-video space-y-5">
        <CardHeader>
          <div className="flex gap-x-3">
            <CloudUploadIcon className="size-8" />
            <CardTitle className="text-lg">
              Quantidade de armazenamento utilizado
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">
          <span
            className={cn(
              levelStorage <= 3 && 'text-amber-500',
              levelStorage <= 1 && 'text-rose-500',
            )}
          >
            {countStorageInMegabytes}
          </span>
          <span> / {totalStorageInMegabytes} MB</span>
        </CardContent>
      </Card>

      <Card className="aspect-video space-y-5">
        <CardHeader>
          <div className="flex gap-x-3">
            <FileStackIcon className="size-8" />
            <CardTitle className="text-lg">
              Quantidade de projetos criados
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">
          <span
            className={cn(
              levelProjects <= 3 && 'text-amber-500',
              levelProjects <= 1 && 'text-rose-500',
            )}
          >
            {metadata.countProjects}
          </span>
          <span> / {metadata.totalProjects}</span>
        </CardContent>
      </Card>

      <Card className="p-0 aspect-video">
        <Link
          to="/projects/create"
          className="h-full flex flex-col items-center justify-center gap-y-4"
        >
          <PlusIcon />
          <span className="font-medium">Criar novo projeto</span>
        </Link>
      </Card>
    </section>
  )
}
