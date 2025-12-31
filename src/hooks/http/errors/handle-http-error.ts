import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleHttpError(error: Error) {
  const messageTitle = 'Ops... Algo deu errado'
  let messageDescription = ''

  if (error instanceof AxiosError) {
    messageDescription = error.response?.data.message
  }

  toast.error(messageTitle, {
    description: messageDescription,
  })
}
