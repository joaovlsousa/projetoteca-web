import type { Icon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

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
    <Button
      asChild
      variant={isActive ? 'secondary' : 'ghost'}
      className={cn(
        'w-full justify-start text-base font-medium',
        isActive ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      <Link to={href}>
        <Icon className="size-5 mr-1" weight={isActive ? 'fill' : 'regular'} />
        <span>{label}</span>
      </Link>
    </Button>
  )
}
