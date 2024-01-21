import Link from 'next/link'

// Components
import BalanceTabs from './balance-tabs'

// Types
import { type TabsBalanceParams } from '@/types/types'

// Components
import BalanceTable from './balance-table'

export default function BalancePage ({ searchParams }: { searchParams: { tab: TabsBalanceParams } }): JSX.Element {
  const { tab } = searchParams

  return (
    <div className='flex flex-col flex-1 px-8 py-4'>
      <h1 className="text-3xl font-semibold">Balance</h1>
      <BalanceTabs tab={tab} />
      <Link href='balance/add' className='bg-slate-800 text-white rounded-lg px-4 py-2'>+ Agregar</Link>
      <BalanceTable tab={tab} />
    </div>
  )
}
