import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CopyIcon, Trash2Icon } from 'lucide-react'

interface WidgetPreviewWrapperProps {
  isSelected?: boolean
  onClick?: () => void
  onCopy?: () => void
  onDelete?: () => void
  children: React.ReactNode
}

export function WidgetPreviewWrapper(props: WidgetPreviewWrapperProps) {
  const { isSelected, children, onClick, onCopy, onDelete } = props

  const handleClick = () => {
    onClick?.()
  }

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onCopy?.()
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete?.()
  }

  return (
    <div
      className={cn(
        'relative group border-2 border-dashed',
        isSelected ? 'border-blue-500' : 'border-transparent'
      )}
      onClick={handleClick}
    >
      {children}
      <div
        className={cn(
          'absolute right-2 bottom-2 flex items-center gap-2',
          !isSelected &&
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        )}
      >
        <Button variant='outline' size='icon' onClick={handleCopy}>
          <CopyIcon className='size-4' />
        </Button>
        <Button variant='outline' size='icon' onClick={handleDelete}>
          <Trash2Icon className='size-4' />
        </Button>
      </div>
    </div>
  )
}
