import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface SidebarNavItemProps {
  isActive: boolean
  icon: LucideIcon
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
