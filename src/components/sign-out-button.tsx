import { LogOutIcon } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function SignOutButton() {
  const { clearToken } = useAuth()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-lg" onClick={clearToken}>
            <LogOutIcon className="text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Desconectar-se do app</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
