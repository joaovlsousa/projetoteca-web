import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ProfileSettings } from './-components/profile-settings'
import { ProfileSettingsSkeleton } from './-components/profile-settings-skeleton'

export const Route = createFileRoute('/_app/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full p-6 space-y-10 rounded-lg bg-sidebar">
      <Suspense fallback={<ProfileSettingsSkeleton />}>
        <ProfileSettings />
      </Suspense>
    </main>
  )
}
