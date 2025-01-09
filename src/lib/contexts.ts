import { createContext } from 'react'
import { Editor } from '@/lib/definition'

export const EditorContext = createContext<Editor | null>(null)
