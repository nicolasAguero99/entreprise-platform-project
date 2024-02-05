import Link from 'next/link'
import Image from 'next/image'

// Types
import { type SearchParams, type OrderTypes, type InvoicesDb } from '@/types/types.d'

// Components
import InputSearchMember from '@/components/input-search-member'
import Pagination from '@/components/pagination'
import InvoicesTable from '../../components/invoices/invoices-table'

// Services
import { getMembersAndPages } from '@/lib/services'

export default async function InvoicesPage ({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const { page } = searchParams
  const { search } = searchParams
  const { order } = searchParams

  const orderValue = order ?? ''
  const searchValue: OrderTypes | string = search ?? ''
  const { data, paginationPages, prev, next } = await getMembersAndPages(searchValue, Number(page), orderValue)

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold mt-20 lg:mt-4 mb-8">Invoices</h1>
      <section className="py-4">
        <div className='flex items-center gap-4'>
          <form className='flex-1'>
            <div className="flex">
              <div className="relative z-10 w-full">
                <InputSearchMember />
              </div>
            </div>
          </form>
          <Link href='members/add' className='bg-background text-xl text-white rounded-lg px-4 py-3'>
            <Image src="/plus-icon.svg" alt="add" width={20} height={20} />
          </Link>
        </div>
        <InvoicesTable data={data as InvoicesDb[]} />
        <Pagination paginationPages={paginationPages} prev={prev} next={next} page={page} search={searchValue} />
      </section>
    </main>
  )
}
