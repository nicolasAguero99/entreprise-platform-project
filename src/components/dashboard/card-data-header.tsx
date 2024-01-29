// Constants
import { TITLES_CARDS_HEADER } from '@/constants/constants'

export default function CardDataHeader ({ data, type }: { data: number, type: string }): JSX.Element {
  const titleCard = TITLES_CARDS_HEADER.find((title) => title.type === type)?.title
  return (
    <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
      <span className="font-semibold text-xl">{titleCard}</span>
      <span>details...</span>
      <small className="text-green-7000">$ {data}</small>
    </div>
  )
}
