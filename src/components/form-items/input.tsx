import { Input } from '../ui/input'

export type DInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'onChange'
> & {
  onChange?: (value: string) => void
}

export function DInput(props: DInputProps) {
  const { onChange, ...otherProps } = props

  return (
    <Input
      {...otherProps}
      onChange={(e) => {
        e.stopPropagation()
        onChange?.(e.target.value)
      }}
    />
  )
}
