'use client'

import { useRouter } from 'next/navigation'

// Types
import { type MembersDb, ActionTypes, type MembersAndPaginationProps } from '@/types/types.d'

// Components
import DeleteBtn from '@/components/delete-btn'
import EditBtn from '@/components/edit-btn'
import { useEffect } from 'react'

export default function OrderBy (): JSX.Element {
  const router = useRouter()
  const handleOrderBy = (action: string): void => {
    const currentSearch = window.location.search
    if (currentSearch.includes('order')) return
    currentSearch === ''
      ? router.push('?order=date')
      : router.push(`${currentSearch}&order=date`)
  }

  return (
    <>
      <button onClick={handleOrderBy} className='bg-slate-500 text-white rounded-lg px-4 py-2'>Filter</button>
    </>
  )
}
