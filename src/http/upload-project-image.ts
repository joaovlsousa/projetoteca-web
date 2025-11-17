import { api } from '@/lib/axios'

interface UploadProjectImageRequest {
  image: File
  projectId: string
}

export async function uploadProjectImage({
  image,
  projectId,
}: UploadProjectImageRequest): Promise<void> {
  const formDataToUpload = new FormData()
  formDataToUpload.append('file', image)

  await api.patch(`/projects/${projectId}/upload`, formDataToUpload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
