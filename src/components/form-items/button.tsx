import { Button } from '@/components/ui/button'
import { useCurrentEditor } from '@/hooks/use-current-editor'
import { Editor } from '@/lib/definition'

export type DButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick'
> & {
  onClick?: (editor: Editor) => void
}

export function DButton(props: DButtonProps) {
  const { onClick, children, ...otherProps } = props
  const editor = useCurrentEditor()

  return (
    <Button
      {...otherProps}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(editor)
      }}
    >
      {children}
    </Button>
  )
}
