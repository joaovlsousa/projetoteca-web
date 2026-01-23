import { useLocation } from '@tanstack/react-router'
import { HomeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

export function Navbar() {
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
    <div className="fixed top-0 z-10 w-full max-w-[calc(100%-3.5rem)] h-14 px-4 flex items-center bg-sidebar border-b">
      <Breadcrumb>
        <BreadcrumbList>
          <HomeIcon className="size-4" />
          <BreadcrumbSeparator />

          <BreadcrumbItem className="capitalize">
            <BreadcrumbPage>{breadcrump}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
