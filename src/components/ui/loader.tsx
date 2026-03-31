import { SpinnerIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return <SpinnerIcon className={cn('size-4 animate-spin', className)} />
}
