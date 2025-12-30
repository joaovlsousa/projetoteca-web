import {
  formatDistanceToNow as formatDistanceToNowDateFns,
  setDefaultOptions,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

setDefaultOptions({
  locale: ptBR,
})

export function formatDistanceToNow(date: string | Date): string {
  return formatDistanceToNowDateFns(date, { addSuffix: true })
}
