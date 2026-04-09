import { CopyIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { jwtDecode } from 'jwt-decode'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Field, FieldDescription } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { env } from '@/config/env'
import { useGetProfileStatus } from '@/hooks/http/use-get-profile-status'
import { useUpdateProfileStatus } from '@/hooks/http/use-update-profile-status'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export function ProfileStatusSettings() {
  const { token } = useAuth()

  if (!token) {
    throw new Error('Token is required')
  }

  const {
    data: { isPublicProfile },
  } = useGetProfileStatus()
  const updateProfileStatus = useUpdateProfileStatus()

  const [isPublicProfileChecked, setIsPublicProfileChecked] =
    useState<boolean>(isPublicProfile)
  const [isCopyPending, startTransition] = useTransition()

  const { username } = jwtDecode<{ username: string }>(token)

  const publicProfileUrl = isPublicProfileChecked
    ? `${env.VITE_APP_URL}/${username}`
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
    <div className="w-full p-6 rounded-lg bg-sidebar">
      <section id="profileStatusSettings" className="max-w-lg space-y-4">
        <div className="flex items-center gap-x-2">
          <EyeSlashIcon className="size-5" />
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
          <Field>
            <InputGroup>
              <InputGroupInput
                value={publicProfileUrl}
                disabled
                className="disabled:cursor-auto disabled:opacity-100"
              />
              <InputGroupAddon align="inline-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={handleCopyPublicProfileUrl}
                      disabled={isCopyPending}
                    >
                      <CopyIcon className="text-foreground" />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>Copiar Url</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Compartilhe seu perfil através dessa url
            </FieldDescription>
          </Field>
        )}
      </section>
    </div>
  )
}
