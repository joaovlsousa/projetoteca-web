import { CopyIcon, FileUserIcon, GlobeLockIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { env } from '@/config/env'
import { useGetProfile } from '@/hooks/http/use-get-profile'
import { useUpdateProfileStatus } from '@/hooks/http/use-update-profile-status'
import { cn } from '@/lib/utils'

export function ProfileSettings() {
  const {
    data: { user },
  } = useGetProfile()
  const updateProfileStatus = useUpdateProfileStatus()

  const [isPublicProfileChecked, setIsPublicProfileChecked] = useState<boolean>(
    user.isPublicProfile,
  )
  const [isCopyPending, startTransition] = useTransition()

  const publicProfileUrl = isPublicProfileChecked
    ? `${env.VITE_APP_URL}/${user.username}`
    : null

  function handleCopyPublicProfileUrl() {
    startTransition(async () => {
      await window.navigator.clipboard.writeText(publicProfileUrl ?? '')
    })

    toast.success('Url copiada para sua área de transferência')
  }

  async function handleCheckedChange(checked: boolean) {
    await updateProfileStatus.mutateAsync({
      isPublicProfile: checked,
    })

    setIsPublicProfileChecked(checked)
  }

  return (
    <div className="flex flex-col items-center space-y-10">
      <section id="profileInfo" className="w-full max-w-lg space-y-4">
        <div className="flex items-center gap-x-2">
          <FileUserIcon className="size-5" />
          <h2 className="text-xl font-medium">Informações pessoais</h2>
        </div>

        <div className="space-y-1">
          <Label>Nome</Label>
          <Input disabled value={user.name} className="disabled:opacity-100" />
        </div>

        <div className="space-y-1">
          <Label>Username</Label>
          <Input
            disabled
            value={user.username}
            className="disabled:opacity-100"
          />
        </div>
      </section>

      <section id="privacySettings" className="w-full max-w-lg space-y-4">
        <div className="flex items-center gap-x-2">
          <GlobeLockIcon className="size-5" />
          <h2 className="text-xl font-medium">Configurações de privacidade</h2>
        </div>

        <label
          htmlFor="isPublicProfile"
          className={cn(
            'w-full flex relative p-6 rounded-md bg-muted cursor-pointer',
            updateProfileStatus.isPending && 'pointer-events-none opacity-50',
          )}
        >
          <div className="space-y-1.5">
            <h4 className="font-medium">Tornar perfil público</h4>
            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              Ao tornar seu perfil público, será gerada uma url que você poderá
              compartilhar publicamente. Qualquer pessoa que tiver acesso a essa
              url poderá ver seus projetos.
            </p>
          </div>

          <Switch
            id="isPublicProfile"
            checked={isPublicProfileChecked}
            onCheckedChange={handleCheckedChange}
            disabled={updateProfileStatus.isPending}
            className="absolute top-7 right-6 cursor-pointer"
          />
        </label>

        {publicProfileUrl && (
          <div className="w-full space-y-1">
            <div className="flex items-center justify-between px-6 py-3 rounded-md bg-muted">
              <span className="text-sm">{publicProfileUrl}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCopyPublicProfileUrl}
                disabled={isCopyPending}
              >
                <CopyIcon />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Compartilhe seu perfil através dessa url
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
