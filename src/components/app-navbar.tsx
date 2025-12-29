import { useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { SidebarTrigger } from './ui/sidebar'

export function AppNavbar() {
  const [breadcrump, setBreadcrump] = useState<string>('')
  const { pathname } = useLocation()

  useEffect(() => {
    const paths = pathname.split('/')
    const path = paths[paths.length - 1]

    switch (path) {
      case 'projects':
        setBreadcrump('Seus projetos')
        break

      case 'create':
        setBreadcrump('Criar novo projeto')
        break

      case 'edit':
        setBreadcrump('Alterar dados do projeto')
        break
    }
  }, [pathname])

  return (
    <div className="fixed z-10 w-full h-14 px-4 flex items-center gap-x-4 bg-sidebar border-b">
      <SidebarTrigger />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />

          <BreadcrumbItem className="capitalize">
            <BreadcrumbPage>{breadcrump}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
