'use client'
import { useRouter, useSearchParams } from 'next/navigation'

// Utils
import { createQueryParams } from '@/lib/utils'

// Constants
import { MONTHS } from '@/constants/constants'

// Types
import { type Months } from '@/types/types'

export default function SelectDate ({ currentMonth }: { currentMonth: Months }): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const month = e.target.value
    if (month !== '0') {
      router.push(`?${createQueryParams(searchParams, 'month', month)}`)
    } else {
      params.delete('month')
      router.push(`?${params.toString()}`)
    }
  }

  return (
    <select onChange={handleDateChange} className="block w-full px-3 py-2 my-6 text-sm bg-background text-white rounded-md" value={String(currentMonth)}>
      {
        MONTHS.map(month => <option key={month.value} value={month.value}>{month.name}</option>
        )
      }
    </select>
  )
}
