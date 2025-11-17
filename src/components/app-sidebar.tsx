import { Link, useLocation } from '@tanstack/react-router'
import { FolderOpenIcon } from 'lucide-react'
import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { Profile } from './profile'
import { ProfileSkeleton } from './profile-skeleton'
import { SignOutButton } from './sign-out-button'
import { Separator } from './ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from './ui/sidebar'

const links = [
  {
    name: 'Projects',
    path: '/projects',
    icon: FolderOpenIcon,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 flex items-center justify-center border-b">
        <Link to="/">
          <Logo size={state === 'collapsed' ? 'sm' : 'default'} />
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-6">
        <SidebarMenu className="px-2">
          {links.map((link) => (
            <Link to={link.path} key={link.path}>
              <SidebarMenuButton
                isActive={link.path === pathname}
                tooltip={link.name}
                className="cursor-pointer"
              >
                <link.icon className="size-4" />
                {link.name}
              </SidebarMenuButton>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          'flex-row items-center gap-x-1.5',
          state === 'collapsed' && 'flex-col',
        )}
      >
        <div className="flex-1">
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        </div>

        {state === 'expanded' && (
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-8"
          />
        )}

        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  )
}
