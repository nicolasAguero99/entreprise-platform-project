import Link from 'next/link'
import Image from 'next/image'

// Types
import { type SearchParams, type InvestorsAndPagination, type OrderTypes } from '@/types/types.d'

// Components
import InputSearchMember from '@/components/input-search-member'
import Pagination from '@/components/pagination'
import InvestorsTable from '../../components/investors/investors-table'
import SelectDate from '../../components/investors/select-date'

// Services
import { getInvestorsAndPages } from '@/lib/services'

export default async function InvestorsPage ({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const { page } = searchParams
  const { search } = searchParams
  const { order } = searchParams
  const { month } = searchParams

  const orderValue = order ?? ''
  const searchValue: OrderTypes | string = search ?? ''
  const { data, paginationPages, prev, next }: InvestorsAndPagination = await getInvestorsAndPages(searchValue, Number(page), orderValue)

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold mt-20 lg:mt-4 mb-8">Investors</h1>
      <section className="py-4">
        <div className='flex items-center gap-4'>
          <form className='flex-1'>
            <div className="flex">
              <div className="relative z-10 w-full">
                <InputSearchMember />
              </div>
            </div>
          </form>
          <Link href='investors/add' className='bg-background text-xl text-white rounded-lg px-4 py-3'>
            <Image src="/plus-icon.svg" alt="add" width={20} height={20} />
          </Link>
        </div>
        <SelectDate currentMonth={month} />
        <InvestorsTable data={data} month={month} />
        <Pagination paginationPages={paginationPages} prev={prev} next={next} page={page} search={searchValue} />
      </section>
    </main>
  )
}
