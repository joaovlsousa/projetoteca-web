import type { Icon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface SidebarNavItemProps {
  isActive: boolean
  icon: Icon
  href: string
  label: string
}

export function SidebarNavItem({
  href,
  label,
  isActive,
  icon: Icon,
}: SidebarNavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={href}>
          <Button variant={isActive ? 'secondary' : 'ghost'} size="icon-lg">
            <Icon />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}
