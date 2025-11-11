'use client'

import { useParams } from '@tanstack/react-router'
import { ImageUpIcon } from 'lucide-react'
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'
import { useUploadProjectImage } from '@/http/use-upload-project-image'

export function UploadProjectImageForm() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const uploadImage = useUploadProjectImage()
  const { projectId } = useParams({
    from: '/_app/projects/$projectId/edit/image/',
  })

  useEffect(() => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null)
  }, [file])

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files ? e.target.files[0] : null)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (file && !uploadImage.isPending) {
      await uploadImage.mutateAsync({
        image: file,
        projectId,
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <Label
        htmlFor="file"
        className="w-full relative flex flex-col items-center justify-center aspect-video bg-transparent border rounded-md cursor-pointer overflow-hidden"
      >
        {!file && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <ImageUpIcon className="size-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              Click to choose a image
            </span>
          </div>
        )}

        {previewUrl && <img src={previewUrl} alt="Project screen preview" />}
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
            <span>Uploading image...</span>
          </>
        ) : (
          'Upload image'
        )}
      </Button>
    </form>
  )
}
