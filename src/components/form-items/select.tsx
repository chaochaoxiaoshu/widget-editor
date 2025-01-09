import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export interface DSelectProps {
  id?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  options: { label: string; value: string }[]
  [key: string]: unknown
}

export function DSelect(props: DSelectProps) {
  const { id, value, onChange, placeholder, options, ...otherProps } = props

  return (
    <Select value={value} onValueChange={onChange} {...otherProps}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
