// Constants
import { TITLES_CARDS_HEADER } from '@/constants/constants'

// Icon
import IncreaseIcon from '../increase-icon'

export default function CardDataHeader ({ data, type }: { data: number, type: string }): JSX.Element {
  const titleCard = TITLES_CARDS_HEADER.find((title) => title.type === type)?.title
  const color = data > 0 ? 'text-positive' : 'text-negative'
  const isIncrease = data > 0
  const text = data.toLocaleString('en-US')

  return (
    <div className="w-full flex flex-1 flex-col gap-2 p-4 bg-white text-black rounded-lg shadow-md">
      <span className="font-semibold text-xl">{titleCard}</span>
      <div className='flex justify-between items-center gap-4'>
        <small className={`text-2xl font-semibold ${color}`}>$ {text}</small>
        <IncreaseIcon isIncrease={isIncrease} />
      </div>
    </div>
  )
}
