/* eslint-disable @typescript-eslint/no-explicit-any */
import { Widget } from '@/lib/definition'
import { get, set } from 'lodash-es'
import { useState } from 'react'
import { useCurrentEditor } from './use-current-editor'

export function useFieldState<T = any>(
  widget: Widget | null,
  name?: string
): [T | undefined, (value: T) => void] {
  const [value, setInternalValue] = useState<T | undefined>(
    () => get(widget?.state, name ?? '') as T | undefined
  )

  const { updateWidget } = useCurrentEditor()

  const setValue = (newValue: T) => {
    if (!widget?.state) return
    const newState = { ...widget.state }
    setInternalValue(newValue)
    set(newState, name ?? '', newValue)
    updateWidget({ ...widget, state: newState })
  }

  return [value, setValue]
}
