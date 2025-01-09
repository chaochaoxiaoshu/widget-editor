import { useCurrentEditor } from '@/hooks/use-current-editor'
import { createWidget } from '@/lib/helpers'
import { LucideProps } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export interface WidgetCardData {
  kind: string
  name: string
  Icon: React.ComponentType<LucideProps>
}

interface WidgetsLibraryProps {
  widgetCards: WidgetCardData[]
}

export function WidgetsLibrary(props: WidgetsLibraryProps) {
  return (
    <div>
      <div className='p-4 pb-3'>
        <h2 className='font-medium'>组件库</h2>
      </div>
      <Separator />
      <div className='grid grid-cols-2 gap-4 p-4'>
        {props.widgetCards.map((widgetCard) => (
          <WidgetCard key={widgetCard.kind} data={widgetCard} />
        ))}
      </div>
    </div>
  )
}

interface WidgetCardProps {
  data: WidgetCardData
}

function WidgetCard(props: WidgetCardProps) {
  const {
    data: { kind, Icon, name }
  } = props

  const editor = useCurrentEditor()
  const schema = editor.schemas.find((schema) => schema.kind === kind)

  const handleClick = () => {
    if (!schema) {
      throw new Error(`未找到 kind 为 ${kind} 的 Schema`)
    }
    const widget = createWidget(schema)
    editor.insertWidget(widget)
  }

  return (
    <div
      className='flex flex-col justify-center items-center py-5 gap-2 rounded-lg bg-muted cursor-pointer select-none hover:bg-muted/60'
      onClick={handleClick}
    >
      <Icon className='size-6' />
      <p className='text-xs'>{name}</p>
    </div>
  )
}
