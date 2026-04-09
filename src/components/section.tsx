import type { Icon } from '@phosphor-icons/react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends ComponentProps<'section'> {
  title: string
  icon: Icon
  children: ReactNode
  description?: string
}

export function Section({
  title,
  icon: Icon,
  children,
  description,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full p-6 rounded-lg bg-sidebar aria-disabled:opacity-30 aria-disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <div className="max-w-2/3 space-y-6">
        <header>
          <div className="flex items-center gap-x-2">
            <Icon className="size-5" />
            <h3 className="text-xl font-medium">{title}</h3>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>

        {children}
      </div>
    </section>
  )
}
