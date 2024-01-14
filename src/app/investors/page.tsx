import Link from 'next/link'

// Types
import { type SearchParams, type InvestorsAndPagination, type OrderTypes } from '@/types/types.d'

// Components
import InputSearchMember from '@/components/input-search-member'
import Pagination from '@/components/pagination'
import OrderBy from '@/components/order-by-member'
import InvestorsTable from './investors-table'
import SelectDate from './select-date'

// Services
import { getInvestorsAndPages } from '@/lib/services'

export default async function MembersPage ({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const { page } = searchParams
  const { search } = searchParams
  const { order } = searchParams
  const { month } = searchParams

  const orderValue = order ?? ''
  const searchValue: OrderTypes | string = search ?? ''
  const { data, paginationPages, prev, next }: InvestorsAndPagination = await getInvestorsAndPages(searchValue, Number(page), orderValue)

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Investors</h1>
      <section className="py-4">
        <div className='flex items-center gap-4'>
          <form className='flex-1'>
            <div className="flex">
              <div className="relative w-full">
                <InputSearchMember />
                <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
          <Link href='investors/add' className='bg-slate-800 text-white rounded-lg px-4 py-2'>+ Agregar</Link>
        </div>
        <OrderBy />
        <SelectDate currentMonth={month} />
        <InvestorsTable data={data} month={month} />
        <Pagination paginationPages={paginationPages} prev={prev} next={next} page={page} search={searchValue} />
      </section>
    </main>
  )
}
