'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Types
import { ActionTypes, type MembersAndPaginationProps } from '@/types/types.d'

// Services
import { createQueryParams } from '@/lib/utils'

export default function Pagination ({ paginationPages, prev, next, page, search }: MembersAndPaginationProps): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { PREV_ACTION, NEXT_ACTION, PAGE_ACTION } = ActionTypes

  useEffect(() => {
    Number(page) > paginationPages.length && router.push(`?${createQueryParams(searchParams, 'page', '1')}`)
  }, [search])

  const handleGoPage = (action: string, pageNumber?: number): void => {
    if (action === PREV_ACTION) {
      router.push(`?${createQueryParams(searchParams, 'page', String(prev))}`)
    } else if (action === PAGE_ACTION) {
      router.push(`?${createQueryParams(searchParams, 'page', String(pageNumber))}`)
    } else if (action === NEXT_ACTION) {
      router.push(`?${createQueryParams(searchParams, 'page', String(page !== undefined ? next : '2'))}`)
    } else {
      router.push(`?${createQueryParams(searchParams, 'page', String(page !== undefined ? next : '2'))}`)
    }
  }

  return (
    <>
    <nav>
      <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
        <li>
          <button onClick={() => { handleGoPage(PREV_ACTION) }} className={`${Number(page) > 1 ? 'flex' : 'hidden'} items-center justify-center mx-1 px-3 h-8 leading-tight border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-700 bg-gray-700 text-gray-100`}>
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        </li>
        {
          paginationPages.map((item) => {
            const pageNumber = item + 1
            const isFirstPage = pageNumber === 1 && page === undefined
            return (
              <li key={pageNumber}>
                <button onClick={() => { handleGoPage(PAGE_ACTION, pageNumber) }} className={`flex items-center justify-center mx-1 px-3 h-8 leading-tight border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-700 ${pageNumber === Number(page) || isFirstPage ? 'text-gray-700 bg-gray-100' : 'bg-gray-700 text-gray-100'}`}>
                  <span className="sr-only">{pageNumber}</span>
                  {pageNumber}
                </button>
              </li>
            )
          })
        }
        <li>
          <button onClick={() => { handleGoPage(NEXT_ACTION) }} className={`${Number(page) < paginationPages.length || (page === undefined && paginationPages.length > 1) ? 'flex' : 'hidden'} items-center justify-center mx-1 px-3 h-8 leading-tight border border-gray-300 rounded-lg hover:bg-gray-300 hover:text-gray-700 bg-gray-700 text-gray-100`}>
            <span className="sr-only">Next</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
    </>
  )
}
