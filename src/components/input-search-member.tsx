'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function InputSearchMember (): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState(new URLSearchParams(searchParams)?.get('search') ?? '')

  function handleTypeSearch (e: React.ChangeEvent<HTMLInputElement>): void {
    const params = new URLSearchParams(searchParams)
    const page = params.get('page')
    setSearch(e.target.value)
    console.log('page', page)
    if (page === null && e.target.value.trim() !== '') {
      params.set('page', '1')
    }
    e.target.value.trim() !== '' ? params.set('search', e.target.value) : params.delete('search')
    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    console.log('search', search)
  }, [search])

  return (
    <input onChange={handleTypeSearch} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search members" value={search} />
  )
}
