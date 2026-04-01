import { FolderOpenIcon, UserGearIcon } from '@phosphor-icons/react'
import { Link, useLocation } from '@tanstack/react-router'
import { Logo } from './logo'
import { ProfileInfo } from './profile-info'
import { SidebarNavItem } from './sidebar-nav-item'
import { SignOutButton } from './sign-out-button'
import { Separator } from './ui/separator'
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
    icon: UserGearIcon,
  },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed inset-0 w-64 p-4 flex flex-col items-stretch space-y-10 bg-sidebar border-r">
      <header>
        <Tooltip>
          <TooltipTrigger>
            <Link to="/">
              <Logo />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            Ir para a tela inicial
          </TooltipContent>
        </Tooltip>
      </header>

      <main className="flex-1 space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Menu</h4>

        <nav className="spce-y-3">
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
      </main>

      <footer className="w-full flex items-center gap-x-2">
        <ProfileInfo />
        <Separator orientation="vertical" />
        <SignOutButton />
      </footer>
    </aside>
  )
}
