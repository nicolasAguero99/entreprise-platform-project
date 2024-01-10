'use client'

import { useRouter } from 'next/navigation'

// Constants
import { API_URL } from '@/constants/constants'

export default function PayButton ({ memberId, paid }: { memberId: number, paid: boolean }): JSX.Element {
  const router = useRouter()
  const textButton = paid ? 'Unpay' : 'Pay'

  const handlePaidToggle = async (): Promise<void> => {
    console.log('paid', paid)
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
    <button onClick={() => { void handlePaidToggle() }} className='bg-slate-800 text-white rounded-lg px-4 py-2'>{textButton}</button>
  )
}
