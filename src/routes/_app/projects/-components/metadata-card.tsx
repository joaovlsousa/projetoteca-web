import type { LucideIcon } from 'lucide-react'
import { type ReactNode, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetadataCardSkeleton } from './metadata-card-skeleton'

interface MetadataCardProps {
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function MetadataCard({
  title,
  children,
  icon: Icon,
}: MetadataCardProps) {
  return (
    <Card className="aspect-video">
      <CardHeader>
        <div className="w-fit p-2 rounded-lg bg-primary/15">
          <Icon className="size-8 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<MetadataCardSkeleton />}>{children}</Suspense>
      </CardContent>
    </Card>
  )
}
