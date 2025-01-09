import { z } from 'zod'
import { defineWidgetSchema } from '@/lib/helpers'
import { ImageWidget } from './component'

export interface ImageWidgetState {
  src: string
  linkType: string
  linkTarget: string
}

export const imageWidgetSchema = defineWidgetSchema<ImageWidgetState>({
  kind: 'image',
  Component: ImageWidget,
  defaultState: {
    src: '',
    linkType: 'none',
    linkTarget: ''
  },
  formSchema: {
    items: [
      {
        key: 'src-input',
        as: 'Input',
        fieldPath: 'src',
        label: '图片',
        props: {
          placeholder: '请输入图片地址'
        },
        rule: z.string().url({ message: '请输入正确的图片地址' })
      },
      {
        key: 'link-type-select',
        as: 'Select',
        fieldPath: 'linkType',
        label: '链接类型',
        props: {
          placeholder: '请选择链接类型',
          options: [
            { label: '无', value: 'none' },
            { label: '跳转', value: 'link' }
          ]
        }
      },
      {
        key: 'link-target-input',
        as: 'Input',
        fieldPath: 'linkTarget',
        label: '链接指向',
        props: {
          placeholder: '请输入链接指向'
        },
        rule: z.string().url({ message: '请输入正确的链接' }),
        visible: (state) => state.linkType === 'link'
      }
    ]
  }
})
