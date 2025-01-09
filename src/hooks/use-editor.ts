import { useState } from 'react'
import { Editor, Widget, WidgetSchema } from '@/lib/definition'
import { createWidget } from '@/lib/helpers'

interface UseEditorOptions {
  schemas: WidgetSchema[]
  defaultWidgets?: Widget[]
}

export function useEditor(options: UseEditorOptions): Editor {
  const { schemas, defaultWidgets } = options

  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets ?? [])
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId) ?? null

  const selectWidget = (widget: Widget | null) => {
    setSelectedWidgetId(widget?.id ?? null)
  }

  const insertWidget = (widget: Widget, index?: number) => {
    setWidgets((prevWidgets) => {
      const newWidgets = [...prevWidgets]
      newWidgets.splice(index ?? newWidgets.length, 0, widget)
      return newWidgets
    })
    selectWidget(widget)
  }

  const copyWidget = (widget: Widget) => {
    const schema = schemas.find((s) => s.kind === widget.kind)
    if (!schema) {
      throw new Error('没有找到组件的 Schema')
    }
    const newWidget = createWidget(schema, widget.state)
    const targetIndex = widgets.findIndex((w) => w.id === widget.id) + 1
    insertWidget(newWidget, targetIndex)
    selectWidget(newWidget)
  }

  const updateWidget = (widget: Widget) => {
    setWidgets((prevWidgets) => {
      const newWidgets = [...prevWidgets]
      const targetIndex = newWidgets.findIndex((w) => w.id === widget.id)
      newWidgets[targetIndex] = widget
      return newWidgets
    })
  }

  const deleteWidget = (widget: Widget) => {
    setWidgets((widgets) => {
      return widgets.filter((w) => w.id !== widget.id)
    })
    if (selectedWidgetId === widget.id) {
      setSelectedWidgetId(null)
    }
  }

  const editor: Editor = {
    schemas,
    widgets,
    setWidgets,
    selectedWidget,
    selectWidget,
    insertWidget,
    copyWidget,
    updateWidget,
    deleteWidget
  }

  return editor
}
