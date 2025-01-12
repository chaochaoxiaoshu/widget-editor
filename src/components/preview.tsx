import { useCurrentEditor } from '@/hooks/use-current-editor'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WidgetPreviewWrapper } from './widget-preview-wrapper'

export function Preview() {
  const editor = useCurrentEditor()

  return (
    <main className='flex justify-center items-center w-full h-full bg-muted'>
      <div className='relative flex flex-col min-w-[300px] aspect-[9/20] h-[95vh] bg-background rounded-3xl overflow-hidden'>
        <div className='flex-none flex justify-center items-center h-[12%] pt-[10%] border-b'>
          <span className='font-medium'>预览</span>
        </div>
        <ScrollArea className='flex-auto'>
          {editor.widgets.map((widget) => {
            const schema = editor.schemas.find(
              (schema) => schema.kind === widget.kind
            )
            if (!schema) return null
            return (
              <WidgetPreviewWrapper
                key={widget.id}
                isSelected={widget.id === editor.selectedWidget?.id}
                onClick={() => editor.selectWidget(widget)}
                onCopy={() => editor.copyWidget(widget)}
                onDelete={() => editor.deleteWidget(widget)}
              >
                <schema.Component
                  key={`${widget.id}-${JSON.stringify(widget.state)}`}
                  state={widget.state}
                />
              </WidgetPreviewWrapper>
            )
          })}
        </ScrollArea>
        <div className='z-10 absolute bottom-2 left-1/2 -translate-x-1/2 w-[40%] h-1.5 bg-foreground rounded-full' />
      </div>
    </main>
  )
}
