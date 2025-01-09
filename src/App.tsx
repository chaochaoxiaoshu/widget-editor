import { ImageIcon, ImagesIcon } from 'lucide-react'
import { EditorProvider } from '@/components/editor-provider'
import { Inspector } from '@/components/inspector'
import { Preview } from '@/components/preview'
import { WidgetCardData, WidgetsLibrary } from '@/components/widgets-library'
import { useEditor } from '@/hooks/use-editor'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { imageWidgetSchema, carouselWidgetSchema } from '@/lib/widget-schemas'

export default function App() {
  const editor = useEditor({
    schemas: [imageWidgetSchema, carouselWidgetSchema],
    defaultWidgets: [
      {
        id: '1',
        kind: 'image',
        state: {
          src: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png',
          linkType: 'link',
          linkTarget: 'https://www.baidu.com'
        }
      }
    ]
  })

  const widgetCards: WidgetCardData[] = [
    { kind: 'image', name: '图片', Icon: ImageIcon },
    { kind: 'carousel', name: '轮播图', Icon: ImagesIcon }
  ]

  return (
    <EditorProvider editor={editor}>
      <ResizablePanelGroup style={{ height: '100vh' }} direction='horizontal'>
        <ResizablePanel
          defaultSize={20}
          minSize={20}
          maxSize={25}
          style={{ minWidth: '220px' }}
        >
          <WidgetsLibrary widgetCards={widgetCards} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Preview />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={20}
          minSize={20}
          maxSize={25}
          style={{ minWidth: '220px' }}
        >
          <Inspector />
        </ResizablePanel>
      </ResizablePanelGroup>
    </EditorProvider>
  )
}
