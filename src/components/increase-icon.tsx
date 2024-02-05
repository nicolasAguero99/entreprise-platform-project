export default function IncreaseIcon ({ isIncrease }: { isIncrease: boolean }): JSX.Element {
  const color = isIncrease ? 'fill-positive stroke-positive' : 'fill-negative stroke-negative'
  const rotate = isIncrease ? 'rotate-0' : 'scale-y-[-1]'

  return (
    <svg fill="currentColor" className={`size-6 md:size-8 ${color} ${rotate}`} viewBox="0 0 24 24" id="statistic-grow" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg"><polyline id="primary-2" data-name="primary" points="3 15 8 9 14 12 21 5" className={`${color}`} style={{ fill: 'none', stroke: color, strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline><polyline id="primary-3" data-name="primary" points="21 10 21 5 16 5" style={{ fill: 'none', stroke: color, strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline></svg>
  )
}
