import { Progress } from '@/components/ui/progress'
import { useGetStorageMetadata } from '@/hooks/http/use-get-storage-metadata'
import { formatBytesToMegabytes } from '@/lib/utils'

export function StorageMetadata() {
  const {
    data: { metadata },
  } = useGetStorageMetadata()

  const countStorageInMegabytes = formatBytesToMegabytes(
    metadata.countStorageInBytes,
  )

  const totalOfStorageInMegabytesByUser = formatBytesToMegabytes(
    metadata.totalOfStorageInBytesByUser,
  )

  const storagePercentage =
    (metadata.countStorageInBytes / metadata.totalOfStorageInBytesByUser) * 100

  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-sm">{storagePercentage.toFixed(1)}%</span>

      <Progress value={storagePercentage} />

      <span className="text-xs text-muted-foreground ml-auto">
        {countStorageInMegabytes} / {totalOfStorageInMegabytesByUser} MB
      </span>
    </div>
  )
}
