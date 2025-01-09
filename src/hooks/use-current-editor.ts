import { useContext } from 'react'
import { EditorContext } from '@/lib/contexts'

export function useCurrentEditor() {
  const editor = useContext(EditorContext)
  if (!editor) {
    throw new Error('没有找到编辑器上下文')
  }
  return editor
}
