'use client'

import { useState } from 'react'
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
    if (page === null && e.target.value.trim() !== '') {
      params.set('page', '1')
    }
    e.target.value.trim() !== '' ? params.set('search', e.target.value) : params.delete('search')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='w-full h-fit relative z-10'>
      <input onChange={handleTypeSearch} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-white rounded-lg bg-background placeholder:text-white/70" placeholder="Type to search..." value={search} />
      <button onClick={(e) => { e.preventDefault() }} type="submit" className="absolute top-0 bottom-0 right-1 p-2.5">
        <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
          <path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  )
}
