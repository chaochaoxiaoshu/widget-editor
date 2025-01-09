/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useCurrentEditor } from '@/hooks/use-current-editor'
import { useFieldState } from '@/hooks/use-field-state'
import { FormItemSchema, formItemsMap } from '@/lib/definition'
import { Label } from '@/components/ui/label'
import { ZodIssue } from 'zod'

interface DynamicFormItemProps {
  formItemSchema: FormItemSchema
}

export function DynamicFormItem(props: DynamicFormItemProps) {
  const {
    key,
    as,
    label,
    fieldPath,
    visible,
    props: formItemProps,
    rule,
    valueTransformer,
    children: formItemChildren,
    childrenBuilder: formItemChildrenBuilder
  } = props.formItemSchema

  console.assert(
    !(formItemChildren && formItemChildrenBuilder),
    'children 和 childrenBuilder 不能同时传入'
  )

  const FormItem = formItemsMap[as]

  const editor = useCurrentEditor()

  const finalVisible = (() => {
    if (typeof visible === 'boolean') {
      return visible
    }
    if (typeof visible === 'function') {
      return visible(editor.selectedWidget?.state)
    }
    return true
  })()

  const [value, setValue] = useFieldState(editor.selectedWidget, fieldPath)
  const [error, setError] = useState<ZodIssue | null>(null)

  useEffect(() => {
    if (rule && value) {
      const result = rule.safeParse(value)
      setError(result.error?.issues.at(0) ?? null)
    }
  }, [rule, value])

  const handleChange = (value: any) => {
    if (valueTransformer) {
      setValue(valueTransformer(value))
    } else {
      setValue(value)
    }
  }

  if (!finalVisible) {
    return null
  }

  const content = (
    <>
      <FormItem
        id={key}
        {...(formItemProps as any)}
        value={value}
        onChange={handleChange}
      >
        {formItemChildren
          ? formItemChildren?.map((child) => (
              <DynamicFormItem key={child.key} formItemSchema={child} />
            ))
          : formItemProps?.children}
      </FormItem>
      {error && <p className='mt-2 text-red-500 text-xs'>{error.message}</p>}
    </>
  )

  if (label) {
    return (
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor={key} className='text-sm font-medium'>
          {label}
        </Label>
        {content}
      </div>
    )
  }

  return content
}
