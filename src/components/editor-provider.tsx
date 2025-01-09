import { EditorContext } from '@/lib/contexts'
import { Editor } from '@/lib/definition'

interface EditorProviderProps {
  editor: Editor
  children: React.ReactNode
}

export function EditorProvider(props: EditorProviderProps) {
  const { editor, children } = props
  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  )
}
