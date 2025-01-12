import { ImageIcon } from 'lucide-react'
import { CarouselState } from '.'

interface CarouselWidgetProps {
  state: CarouselState
}

export function CarouselWidget(props: CarouselWidgetProps) {
  const { state } = props
  return (
    <div className='relative'>
      {state.items.length > 0 && state.items[0].src.length > 0 ? (
        <img
          src={state.items[0].src}
          alt='image'
          className='aspect-video object-cover w-full'
        />
      ) : (
        <div className='aspect-video object-cover flex justify-center items-center w-full bg-muted'>
          <ImageIcon className='size-8' />
        </div>
      )}
      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5'>
        {state.items.map((_item, index) => (
          <div key={index} className='size-2 bg-foreground rounded-full' />
        ))}
      </div>
    </div>
  )
}
