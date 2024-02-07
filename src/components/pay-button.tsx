'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Constants
import { API_URL } from '@/constants/constants'

// Components
import Loader from './loader'

export default function PayButton ({ memberId, paid }: { memberId: number, paid: boolean }): JSX.Element {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const textButton = paid ? 'Paid' : 'Unpaid'
  const color = paid ? 'text-green-500' : 'text-red-500'

  const handlePaidToggle = async (): Promise<void> => {
    setIsDeleting(true)
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
    <>
      {
        isDeleting
          ? <Loader size='size-5' />
          : <button onClick={() => { void handlePaidToggle() }} className={`${color} underline`}>{textButton}</button>
      }
    </>
  )
}
