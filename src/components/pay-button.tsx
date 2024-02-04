'use client'

import { useRouter } from 'next/navigation'

// Constants
import { API_URL } from '@/constants/constants'

export default function PayButton ({ memberId, paid }: { memberId: number, paid: boolean }): JSX.Element {
  const router = useRouter()
  const textButton = paid ? 'Paid' : 'Unpaid'
  const color = paid ? 'text-green-500' : 'text-red-500'

  const handlePaidToggle = async (): Promise<void> => {
    await fetch(`${API_URL}/invoices/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify({ paid: !paid }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    router.refresh()
  }

  return (
    <button onClick={() => { void handlePaidToggle() }} className={`${color} underline`}>{textButton}</button>
  )
}
