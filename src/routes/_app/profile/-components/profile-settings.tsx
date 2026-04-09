import { FloppyDiskIcon, InfoIcon } from '@phosphor-icons/react'
import { type ChangeEvent, useState } from 'react'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Loader } from '@/components/ui/loader'
import { useGetProfile } from '@/hooks/http/use-get-profile'
import { useUpdateProfileName } from '@/hooks/http/use-update-profile-name'

export function ProfileSettings() {
  const {
    data: { user },
  } = useGetProfile()
  const updateProfileName = useUpdateProfileName()

  const [name, setName] = useState<string>(user.name)
  const isHandleSaveDisabled =
    user.name.trim() === name.trim() || updateProfileName.isPending

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  async function handleSave() {
    await updateProfileName.mutateAsync({
      name: name.trim(),
    })
  }

  return (
    <div className="w-full p-6 rounded-lg bg-sidebar">
      <section id="profileSettings" className="max-w-lg space-y-4">
        <div className="flex items-center gap-x-2">
          <InfoIcon className="size-5" />
          <h2 className="text-xl font-medium">Informações pessoais</h2>
        </div>

        <Field>
          <FieldLabel>Nome</FieldLabel>
          <InputGroup>
            <InputGroupInput value={name} onChange={handleChange} />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="default"
                onClick={handleSave}
                disabled={isHandleSaveDisabled}
              >
                {updateProfileName.isPending ? (
                  <Loader />
                ) : (
                  <>
                    <FloppyDiskIcon className="size-3.5" />
                    <span>Salvar</span>
                  </>
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Nome de usuário</FieldLabel>
          <Input disabled value={user.username} className="" />
        </Field>
      </section>
    </div>
  )
}
