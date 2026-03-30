import { Link, useLocation } from '@tanstack/react-router'
import { FolderOpenIcon, User2Icon } from 'lucide-react'
import { Logo } from './logo'
import { SidebarNavItem } from './sidebar-nav-item'
import { SignOutButton } from './sign-out-button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const links = [
  {
    name: 'Projetos',
    href: '/projects',
    icon: FolderOpenIcon,
  },
  {
    name: 'Perfil',
    href: '/profile',
    icon: User2Icon,
  },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed inset-0 w-14 flex flex-col bg-sidebar border-r">
      <div className="h-14 flex items-center justify-center border-b">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/">
              <Logo size="sm" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Ir para a tela inicial</TooltipContent>
        </Tooltip>
      </div>

      <nav className="flex flex-1 justify-center py-6">
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <SidebarNavItem
                href={link.href}
                label={link.name}
                icon={link.icon}
                isActive={link.href === pathname}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="h-32 flex flex-col items-center justify-end space-y-5 pb-3">
        <SignOutButton />
      </div>
    </aside>
  )
}
