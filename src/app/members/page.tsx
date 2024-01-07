import Link from 'next/link'

// Types
import { type MembersDb, type SearchParams, type MembersAndPagination } from '@/types/types'

// Components
import DeleteBtn from '@/components/delete-btn'
import EditBtn from '@/components/edit-btn'

// Services
import { getMembersAndPages } from '@/lib/services'

export default async function MembersPage ({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const { page } = searchParams
  const { data, paginationPages }: MembersAndPagination = await getMembersAndPages(Number(page))
  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Members</h1>
      <section className="py-4">
        <Link href='members/add'>+ Agregar</Link>
        <ul className="flex flex-col divide-y-[1px] divide-gray-300">
          {
            data.map(({ id, name, email, createdAt }: MembersDb) => {
              const [memberCreatedAt] = new Date(createdAt).toISOString().split('T')
              return (
                <li key={id} className="flex text-center items-center gap-4 py-2">
                  <small className="w-8 text-lg font-medium">{id}</small>
                  <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{name}</span>
                  <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{email}</span>
                  <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{memberCreatedAt}</span>
                  <div className='flex items-center gap-2'>
                    <EditBtn memberId={id} />
                    <DeleteBtn memberId={id} />
                  </div>
                </li>
              )
            })
          }
        </ul>
        <nav className='mt-4'>
          <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
            {/* <li>
              <Link href="?page=1" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-PAGINATION_SLICE_NUMBER00 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-2.PAGINATION_SLICE_NUMBER h-2.PAGINATION_SLICE_NUMBER rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="MPAGINATION_SLICE_NUMBER 1 1 PAGINATION_SLICE_NUMBERl4 4"/>
                </svg>
              </Link>
            </li> */}
            {
              paginationPages.map((item) => {
                const page = item + 1
                const xd = page === Number(searchParams.page)
                console.log('page === Number(searchParams.page)', xd)
                return (
                  <li key={page}>
                    <Link href={`?page=${page}`} className={`flex items-center justify-center mx-1 px-3 h-8 leading-tight border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-700 ${page === Number(searchParams.page) ? 'text-gray-700 bg-gray-100' : 'bg-gray-700 text-gray-100'}`}>
                      <span className="sr-only">{page}</span>
                      {page}
                    </Link>
                  </li>
                )
              })
            }
            {/* <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-PAGINATION_SLICE_NUMBER00 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-2.PAGINATION_SLICE_NUMBER h-2.PAGINATION_SLICE_NUMBER rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
            </li> */}
          </ul>
        </nav>
      </section>
    </main>
  )
}
