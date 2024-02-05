import Link from 'next/link'
import Image from 'next/image'

// Components
import BalanceTabs from '../../components/balance/balance-tabs'

// Types
import { type OrderTypes, type TabsBalanceParams, type BalanceAndPagination } from '@/types/types'

// Components
import InputSearchMember from '@/components/input-search-member'
import BalanceTable from '../../components/balance/balance-table'
import Pagination from '@/components/pagination'

// Services
import { getBalanceAndPages } from '@/lib/services'

export default async function BalancePage ({ searchParams }: { searchParams: { tab: TabsBalanceParams, search: string, page: string, order: OrderTypes | string } }): Promise<JSX.Element> {
  const { tab } = searchParams
  const { search } = searchParams
  const { page } = searchParams
  const { order } = searchParams

  const searchValue: OrderTypes | string = search ?? ''
  const { data, paginationPages, prev, next }: BalanceAndPagination = await getBalanceAndPages(searchValue, Number(page), order)

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold mt-20 lg:mt-4 mb-8">Balance</h1>
      <section className="py-4">
        <div className='flex items-center gap-4'>
          <form className='flex-1'>
            <div className="flex">
              <div className="relative z-10 w-full">
                <InputSearchMember />
              </div>
            </div>
          </form>
          <Link href='balance/add' className='bg-background text-xl text-white rounded-lg px-4 py-3'>
            <Image src="/plus-icon.svg" alt="add" width={20} height={20} />
          </Link>
        </div>
        <BalanceTabs tab={tab} />
        <BalanceTable data={data} tab={tab} />
        <Pagination paginationPages={paginationPages} prev={prev} next={next} page={page} search={searchValue} />
      </section>
    </main>
  )
}
