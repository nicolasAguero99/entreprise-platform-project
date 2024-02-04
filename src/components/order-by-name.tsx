'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// Types
import { OrderTypes } from '@/types/types.d'

// Icon
import OrderIcon from './order-icon'

export default function OrderByName (): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const isActive = (params.get('order') !== '' || params.get('order') !== undefined) ?? false

  const [active, setActive] = useState(isActive)

  const handleOrderBy = (action: OrderTypes): void => {
    active ? params.set('order', action) : params.delete('order')
    router.replace(`${pathname}?${params.toString()}`)
    setActive(!active)
  }

  return (
    <button className='flex gap-2 items-center uppercase' onClick={() => { handleOrderBy(OrderTypes.NAME_ORDER) }}>NAME <OrderIcon isActive={active} /></button>
  )
}
