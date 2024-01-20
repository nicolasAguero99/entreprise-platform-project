// Components
import BalanceTabs from './balance-tabs'

export default function BalancePage ({ searchParams }: { searchParams: string }): JSX.Element {
  const { tab } = searchParams

  return (
    <div className='flex flex-col flex-1 px-8 py-4'>
      <h1 className="text-3xl font-semibold">Balance</h1>
      <BalanceTabs tab={tab} />
    </div>
  )
}
