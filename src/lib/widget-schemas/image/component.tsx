import { ImageWidgetState } from '.'

interface ImageWidgetProps {
  state: ImageWidgetState
}

export function ImageWidget(props: ImageWidgetProps) {
  const { state } = props
  return (
    <img
      src={state.src}
      alt='image'
      className='aspect-video object-cover w-full'
    />
  )
}
