import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ProfileSettings } from './-components/profile-settings'
import { ProfileSettingsSkeleton } from './-components/profile-settings-skeleton'

export const Route = createFileRoute('/_app/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<ProfileSettingsSkeleton />}>
      <ProfileSettings />
    </Suspense>
  )
}
