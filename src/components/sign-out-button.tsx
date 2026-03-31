import { SignOutIcon } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/use-auth'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function SignOutButton() {
  const { clearToken } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    clearToken()
    navigate({ to: '/' })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-lg" onClick={handleSignOut}>
          <SignOutIcon className="text-red-500" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Desconectar-se do app</TooltipContent>
    </Tooltip>
  )
}
