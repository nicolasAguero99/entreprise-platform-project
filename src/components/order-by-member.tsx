'use client'

import { useRouter, useSearchParams } from 'next/navigation'

// Types
import { OrderTypes } from '@/types/types.d'

// Utils
import { createQueryParams } from '@/lib/utils'

export default function OrderBy (): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOrderBy = (action: OrderTypes): void => {
    router.push(`?${createQueryParams(searchParams, 'order', action)}`)
  }

  return (
    <div className='flex gap-4'>
      <button onClick={() => { handleOrderBy(OrderTypes.DATE_ORDER) }} className='bg-slate-500 text-white rounded-lg px-4 py-2'>Date</button>
      <button onClick={() => { handleOrderBy(OrderTypes.NAME_ORDER) }} className='bg-slate-500 text-white rounded-lg px-4 py-2'>Name</button>
    </div>
  )
}
