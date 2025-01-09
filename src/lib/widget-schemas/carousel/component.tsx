import { CarouselState } from '.'

interface CarouselWidgetProps {
  state: CarouselState
}

export function CarouselWidget(props: CarouselWidgetProps) {
  const { state } = props
  return (
    <div className='relative'>
      <img
        src={state.items.at(0)?.src}
        alt='image'
        className='aspect-video object-cover w-full'
      />
      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5'>
        {state.items.map((_item, index) => (
          <div key={index} className='size-2 bg-white rounded-full' />
        ))}
      </div>
    </div>
  )
}
