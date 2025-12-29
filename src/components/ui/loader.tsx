import { LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return <LoaderIcon className={cn('size-4 animate-spin', className)} />
}
