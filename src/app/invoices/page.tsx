import Link from 'next/link'

// Types
import { type SearchParams, type MembersAndPagination, type OrderTypes } from '@/types/types.d'

// Components
import InputSearchMember from '@/components/input-search-member'
import Pagination from '@/components/pagination'
import OrderBy from '@/components/order-by-member'
import InvoicesTable from './invoices-table'

// Services
import { getMembersAndPages } from '@/lib/services'

export default async function MembersPage ({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const { page } = searchParams
  const { search } = searchParams
  const { order } = searchParams

  console.log('searchParams', searchParams)

  const orderValue = order ?? ''
  const searchValue: OrderTypes | string = search ?? ''
  const { data, paginationPages, prev, next }: MembersAndPagination = await getMembersAndPages(searchValue, Number(page), orderValue)

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Members</h1>
      <section className="py-4">
        <div className='flex items-center gap-4'>
          <form className='flex-1'>
            <div className="flex">
              <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
              <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg></button>
              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                  <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                  </li>
                  <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                  </li>
                  <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                  </li>
                  <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                  </li>
                </ul>
              </div>
              <div className="relative w-full">
                <InputSearchMember />
                <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
          <Link href='members/add' className='bg-slate-800 text-white rounded-lg px-4 py-2'>+ Agregar</Link>
        </div>
        <OrderBy />
        <InvoicesTable data={data} />
        <Pagination paginationPages={paginationPages} prev={prev} next={next} page={page} search={searchValue} />
      </section>
    </main>
  )
}
