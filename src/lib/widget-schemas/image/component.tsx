import { ImageIcon } from 'lucide-react'
import { ImageWidgetState } from '.'

interface ImageWidgetProps {
  state: ImageWidgetState
}

export function ImageWidget(props: ImageWidgetProps) {
  const { state } = props

  if (!state.src) {
    return (
      <div className='aspect-video object-cover flex justify-center items-center w-full bg-muted'>
        <ImageIcon className='size-8' />
      </div>
    )
  }

  return (
    <img
      src={state.src}
      alt='image'
      className='aspect-video object-cover w-full'
    />
  )
}
