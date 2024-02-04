export default function OrderIcon ({ isActive }: { isActive: boolean }): JSX.Element {
  console.log('isActive', isActive)
  const color = !isActive ? 'fill-white' : 'fill-gray-500'

  return (
    <svg className={`size-4 ${color}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 15L12 20L17 15M7 9L12 4L17 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
