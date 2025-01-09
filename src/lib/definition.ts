/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodType } from 'zod'
import { DGroup, DGroupProps } from '@/components/form-items/group'
import { DButton, DButtonProps } from '@/components/form-items/button'
import { DInput, DInputProps } from '@/components/form-items/input'
import { DSelect, DSelectProps } from '@/components/form-items/select'

export interface Editor {
  schemas: Readonly<WidgetSchema[]>
  widgets: Widget[]
  setWidgets: (widgets: Widget[]) => void
  selectedWidget: Widget | null
  selectWidget: (widget: Widget | null) => void
  insertWidget: (widget: Widget, index?: number) => void
  copyWidget: (widget: Widget) => void
  updateWidget: (widget: Widget) => void
  deleteWidget: (widget: Widget) => void
}

export interface Widget<S = any> {
  id: string
  kind: string
  state: S
}

export interface WidgetSchema<S = any> {
  kind: string
  Component: React.ComponentType<{ state: S }>
  defaultState: S
  formSchema: FormSchema<S>
}

export interface FormSchema<S = any> {
  items?: FormItemSchema<S>[]
  itemsBuilder?: (editor: Editor) => FormItemSchema<S>[]
}

export type FormItemSchema<S = any> = {
  [K in keyof ComponentPropsMap]: {
    key: string
    as: K
    fieldPath?: PathsToStringProps<S>
    label?: string
    description?: string
    props?: ComponentPropsMap[K]
    rule?: ZodType
    visible?: boolean | ((state: S) => boolean)
    valueTransformer?: (value: any) => any
    children?: FormItemSchema<S>[]
    childrenBuilder?: (editor: Editor) => FormItemSchema<S>[]
  }
}[keyof ComponentPropsMap]

export type ComponentPropsMap = {
  Group: DGroupProps
  Button: DButtonProps
  Input: DInputProps
  Select: DSelectProps
}

export const formItemsMap = {
  Group: DGroup,
  Button: DButton,
  Input: DInput,
  Select: DSelect
} as const

type PathsToStringProps<
  T,
  Depth extends number[] = []
> = Depth['length'] extends 4
  ? never
  : T extends object
  ? {
      [K in keyof T]: T[K] extends Array<infer U>
        ?
            | `${K & string}[${number}]`
            | `${K & string}[${number}]${U extends object
                ? `.${PathsToStringProps<U, [...Depth, 1]>}`
                : ''}`
        : T[K] extends object
        ?
            | `${K & string}`
            | `${K & string}.${PathsToStringProps<T[K], [...Depth, 1]>}`
        : `${K & string}`
    }[keyof T]
  : never
