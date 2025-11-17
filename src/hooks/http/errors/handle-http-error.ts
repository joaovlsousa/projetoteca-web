import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleHttpError(error: Error) {
  const messageTitle = 'Something went wrong'
  let messageDescription = ''

  if (error instanceof AxiosError) {
    messageDescription = error.response?.data.message
  }

  toast.error(messageTitle, {
    description: messageDescription,
  })
}
