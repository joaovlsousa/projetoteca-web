import { useLocation } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { SidebarTrigger } from './ui/sidebar'

export function AppNavbar() {
  const { href } = useLocation()

  const [_, ...paths] = href.split('/')
  const breadcrumps =
    paths.length > 2 ? [paths[0], paths[paths.length - 1]] : paths

  return (
    <div className="w-full h-14 px-4 flex items-center gap-x-4 bg-sidebar/20 border-b">
      <SidebarTrigger />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumps.map((breadcrump, index) => (
            <>
              {index !== breadcrumps.length - 1 ? (
                <>
                  <BreadcrumbItem className="capitalize">
                    {breadcrump}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbItem className="capitalize">
                  <BreadcrumbPage>{breadcrump}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
