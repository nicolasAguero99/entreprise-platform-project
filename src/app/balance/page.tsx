import Link from 'next/link'

// Components
import BalanceTabs from './balance-tabs'

// Types
import { type OrderTypes, type TabsBalanceParams } from '@/types/types'

// Components
import BalanceTable from './balance-table'

export default function BalancePage ({ searchParams }: { searchParams: { tab: TabsBalanceParams, search: string, page: string, order: OrderTypes | string } }): JSX.Element {
  const { tab } = searchParams
  const { search } = searchParams
  const { page } = searchParams
  const { order } = searchParams

  return (
    <div className='flex flex-col flex-1 px-8 py-4'>
      <h1 className="text-3xl font-semibold">Balance</h1>
      <BalanceTabs tab={tab} />
      <Link href='balance/add' className='bg-slate-800 text-white rounded-lg px-4 py-2'>+ Agregar</Link>
      <BalanceTable tab={tab} searchValue={search} page={page} order={order} />
    </div>
  )
}
