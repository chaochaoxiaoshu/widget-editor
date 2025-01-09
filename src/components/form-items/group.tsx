import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

export interface DGroupProps {
  className?: string
  title?: string
  headerView?: React.ReactNode
  headerTrailing?: React.ReactNode
  children?: React.ReactNode
  [key: string]: unknown
}

export function DGroup(props: DGroupProps) {
  const {
    className,
    title,
    headerView,
    headerTrailing,
    children,
    ...otherProps
  } = props

  return (
    <div
      className={cn('flex flex-col border rounded-md', className)}
      {...otherProps}
    >
      <div className='p-3'>
        {headerView || (
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-medium'>{title}</h4>
            {headerTrailing}
          </div>
        )}
      </div>
      <Separator />
      <div className='p-3 space-y-3'>{children}</div>
    </div>
  )
}
