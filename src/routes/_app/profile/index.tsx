import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ProfileSettings } from './-components/profile-settings'
import { ProfileSettingsSkeleton } from './-components/profile-settings-skeleton'
import { ProfileStatusSettings } from './-components/profile-status-settings'

export const Route = createFileRoute('/_app/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full space-y-10">
      <Suspense fallback={<ProfileSettingsSkeleton />}>
        <ProfileSettings />
      </Suspense>
      <Suspense fallback={<ProfileSettingsSkeleton />}>
        <ProfileStatusSettings />
      </Suspense>
    </main>
  )
}
