import { FolderOpenIcon, PlugsIcon, UserGearIcon } from '@phosphor-icons/react'
import { useLocation } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Logo } from './logo'
import { Profile } from './profile'
import { ProfileSkeleton } from './profile-skeleton'
import { SidebarNavItem } from './sidebar-nav-item'
import { SignOutButton } from './sign-out-button'
import { Separator } from './ui/separator'

const links = [
  {
    name: 'Projetos',
    href: '/projects',
    icon: FolderOpenIcon,
  },
  {
    name: 'Conectar portfólio',
    href: '/connect-portfolio',
    icon: PlugsIcon,
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
        <Logo side="right" sideOffset={10} />
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
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
        <Separator orientation="vertical" />
        <SignOutButton />
      </footer>
    </aside>
  )
}
