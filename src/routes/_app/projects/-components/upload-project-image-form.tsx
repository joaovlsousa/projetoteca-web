import { ImageUpIcon } from 'lucide-react'
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'
import { useUploadProjectImage } from '@/hooks/http/use-upload-project-image'
import { cn } from '@/lib/utils'

interface UploadProjectImageFormProps {
  projectId: string
  onFormSubmitted: () => void
}

export function UploadProjectImageForm({
  projectId,
  onFormSubmitted,
}: UploadProjectImageFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const uploadImage = useUploadProjectImage()

  useEffect(() => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null)
  }, [file])

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files ? event.target.files[0] : null)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (file && !uploadImage.isPending) {
      await uploadImage.mutateAsync({
        image: file,
        projectId,
      })

      onFormSubmitted()
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-2">
      <Label
        htmlFor="file"
        className={cn(
          'w-full relative flex flex-col items-center justify-center aspect-video bg-secondary rounded-md cursor-pointer overflow-hidden',
          file ? 'border-0' : 'border border-dashed',
        )}
      >
        {!file && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <ImageUpIcon className="size-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              Toque para selecionar uma imagem
            </span>
          </div>
        )}

        {previewUrl && <img src={previewUrl} alt="Imagem do projeto" />}
      </Label>
      <input
        id="file"
        name="file"
        type="file"
        accept="image/png"
        onChange={handleFile}
        disabled={uploadImage.isPending}
        className="invisible"
      />

      <Button type="submit" disabled={uploadImage.isPending} className="w-full">
        {uploadImage.isPending ? (
          <>
            <Loader />
            <span>Salvando imagem...</span>
          </>
        ) : (
          'Salvar imagem'
        )}
      </Button>
    </form>
  )
}
