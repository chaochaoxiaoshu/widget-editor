import { z } from 'zod'
import { defineWidgetSchema } from '@/lib/helpers'
import { CarouselWidget } from './component'
import { FormItemSchema } from '@/lib/definition'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

export interface CarouselState {
  items: {
    src: string
    linkType: string
    linkTarget: string
  }[]
}

export const carouselWidgetSchema = defineWidgetSchema<CarouselState>({
  kind: 'carousel',
  Component: CarouselWidget,
  defaultState: {
    items: Array.from({ length: 3 }).map(() => ({
      src: '',
      linkType: 'none',
      linkTarget: ''
    }))
  },
  formSchema: {
    itemsBuilder: (editor) => {
      const items: FormItemSchema<CarouselState>[] = []

      const state = editor.selectedWidget?.state as CarouselState
      if (!state) return items

      const handleCreateItem = () => {
        if (!editor.selectedWidget) return
        const newWidget = {
          ...editor.selectedWidget,
          state: {
            ...state,
            items: [
              ...state.items,
              { src: '', linkType: 'none', linkTarget: '' }
            ]
          }
        }
        editor.updateWidget(newWidget)
      }

      const handleDeleteItem = (index: number) => {
        if (!editor.selectedWidget) return
        const newWidget = {
          ...editor.selectedWidget,
          state: {
            ...state,
            items: state.items.filter((_, i) => i !== index)
          }
        }
        editor.updateWidget(newWidget)
      }

      state.items.forEach((_, index) => {
        items.push({
          key: `carousel-item-${index}`,
          as: 'Group',
          props: {
            title: `轮播图 ${index + 1}`,
            headerTrailing: (
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleDeleteItem(index)}
              >
                <Trash2Icon className='w-4 h-4' />
              </Button>
            )
          },
          children: [
            {
              key: `carousel-item-${index}-src-input`,
              as: 'Input',
              fieldPath: `items[${index}].src`,
              label: '图片',
              props: {
                placeholder: '请输入图片地址'
              },
              rule: z.string().url({ message: '请输入正确的图片地址' })
            },
            {
              key: `carousel-item-${index}-link-type-select`,
              as: 'Select',
              fieldPath: `items[${index}].linkType`,
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
              key: `carousel-item-${index}-link-target-input`,
              as: 'Input',
              fieldPath: `items[${index}].linkTarget`,
              label: '链接指向',
              props: {
                placeholder: '请输入链接指向'
              },
              visible: (state) => state.items.at(index)?.linkType === 'link',
              rule: z.string().url({ message: '请输入正确的链接' })
            }
          ]
        })
      })

      items.push({
        key: 'add-carousel-item-button',
        as: 'Button',
        props: {
          className: 'w-full',
          variant: 'outline',
          children: '添加轮播图',
          onClick: handleCreateItem
        }
      })

      return items
    }
  }
})
