import {
  FileArrowUpIcon,
  FloppyDiskIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
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
  const inputFileRef = useRef<HTMLInputElement>(null)
  const uploadImage = useUploadProjectImage()

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    const previewUrl = URL.createObjectURL(file)
    setPreviewUrl(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [file])

  function handleAddFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files ? event.target.files[0] : null)
  }

  function handleRemoveFile() {
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }

    setFile(null)
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
    <form onSubmit={onSubmit} className="w-full space-y-2 relative">
      <Label
        htmlFor="file"
        className={cn(
          'w-full relative flex flex-col items-center justify-center aspect-video bg-secondary rounded-md cursor-pointer overflow-hidden',
          file ? 'border-0' : 'border border-dashed',
        )}
      >
        {!file && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <FileArrowUpIcon className="size-5 text-muted-foreground" />
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
        ref={inputFileRef}
        accept="image/png, image/webp"
        onChange={handleAddFile}
        disabled={uploadImage.isPending}
        className="invisible"
      />

      {previewUrl && (
        <Button
          type="button"
          size="icon-lg"
          variant="destructive"
          onClick={handleRemoveFile}
          className="absolute -top-4 -right-4 bg-destructive text-foreground hover:bg-destructive/80 rounded-full"
        >
          <TrashIcon />
        </Button>
      )}

      <Button
        type="submit"
        disabled={!file || uploadImage.isPending}
        className="w-full"
      >
        {uploadImage.isPending ? (
          <>
            <Loader />
            <span>Salvando imagem...</span>
          </>
        ) : (
          <>
            <FloppyDiskIcon className="size-4" />
            <span>Salvar imagem</span>
          </>
        )}
      </Button>
    </form>
  )
}
