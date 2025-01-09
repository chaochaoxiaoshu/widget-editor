import { useCurrentEditor } from '@/hooks/use-current-editor'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DynamicFormItem } from './dynamic-form-item'

export function Inspector() {
  const editor = useCurrentEditor()

  const formItemsSchema = (() => {
    const formSchema = editor.schemas.find(
      (schema) => schema.kind === editor.selectedWidget?.kind
    )?.formSchema
    const items = formSchema?.items
    const builder = formSchema?.itemsBuilder
    console.assert(!(items && builder), 'items 和 itemsBuilder 不能同时传入')
    return items ?? builder?.(editor)
  })()

  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 pb-3'>
        <h2 className='font-medium'>编辑</h2>
      </div>
      <Separator />
      <ScrollArea className='flex-auto'>
        <div className='p-4 space-y-4'>
          {formItemsSchema?.map((item) => (
            <DynamicFormItem key={item.key} formItemSchema={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
