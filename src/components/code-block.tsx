import { CopyIcon } from '@phosphor-icons/react'
import { type ComponentProps, useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface CodeBlockProps extends ComponentProps<'div'> {
  code: string
  lang?: string
  filename?: string
}

export function CodeBlock({
  className,
  code,
  lang = 'typescript',
  filename,
  ...props
}: CodeBlockProps) {
  const [parsedCode, setParsedCode] = useState('')

  useEffect(() => {
    if (code) {
      codeToHtml(code, { lang, theme: 'min-dark' }).then(setParsedCode)
    }
  }, [code, lang])

  async function handleCopyCode() {
    await window.navigator.clipboard.writeText(code)

    toast.success('Código copiado com sucesso')
  }

  if (!parsedCode) {
    return <Skeleton className="w-full h-40" />
  }

  return (
    <div
      className={cn('relative rounded-lg border overflow-x-auto', className)}
      {...props}
    >
      {filename && (
        <div className="px-4 py-2 border-b text-xs text-muted-foreground font-mono">
          {filename}
        </div>
      )}

      <div
        className="[&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:leading-relaxed"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <shiki core>
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopyCode}
            type="button"
            size="icon-lg"
            variant="outline"
            className="absolute z-10 top-12 right-4 bg-transparent"
          >
            <CopyIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copiar código</TooltipContent>
      </Tooltip>
    </div>
  )
}
