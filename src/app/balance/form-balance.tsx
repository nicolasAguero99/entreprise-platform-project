'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING } from '@/constants/constants'

// Types
import { type BalanceDb } from '@/types/types'

export default function FormBalance ({ balanceId = null }: { balanceId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [balance, setBalance] = useState({ action: '', amount: 0, date: '' })
  const router = useRouter()
  const textBtn = balanceId === null ? 'Add' : 'Edit'

  useEffect(() => {
    console.log('balanceId', balanceId)
    if (balanceId !== null) {
      const getBalance = async (): Promise<void> => {
        const res = await fetch(`${API_URL}/balance/${balanceId}`, { cache: 'no-cache' })
        const data: BalanceDb = await res.json()
        const formattedData = {
          ...data,
          date: String(data.date).split('T')[0]
        }
        console.log('formattedData', data)
        setBalance(formattedData)
      }

      void getBalance()
    }
  }, [balanceId])

  useEffect(() => {
    console.log('balance', balance)
  }, [balance])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setBalance({
      ...balance,
      [name]: value
    })
  }

  const handleMember = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      ...Object.fromEntries(formData),
      amount: Number(Object.fromEntries(formData).amount),
      date: new Date(String(Object.fromEntries(formData).date)).toISOString()
    }
    console.log('data', data)
    setIsSending(MSG_ADDING)
    let res = null

    if (balanceId === null) {
      res = await fetch(`${API_URL}/balance`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      console.log('data', data)
      setIsSending(MSG_EDITING)
      res = await fetch(`${API_URL}/balance/${balanceId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    if (res.ok) {
      router.push('/balance')
      router.refresh()
    } else {
      console.log('error')
    }
  }

  return (
    <form onSubmit={(e) => { void handleMember(e) }}>
      <label htmlFor="name" className="block text-lg font-medium">Action</label>
      <input onChange={handleChangeValues} type="text" name="action" placeholder='Type action' id="action" className="w-full border-gray-300 rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500" value={balance?.action} />
      <label htmlFor="email" className="block text-lg font-medium">Amount</label>
      <input onChange={handleChangeValues} type="number" name="amount" placeholder='Type amount' id="amount" className="w-full border-gray-300 rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500" value={balance?.amount} />
      <label htmlFor="position" className="block text-lg font-medium">Date</label>
      <input onChange={handleChangeValues} type="date" name="date" placeholder='Type date' id="date" className="w-full border-gray-300 rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500" value={balance?.date} />
      <button className={`w-full h-12 ${isSending === '' ? 'bg-indigo-500' : 'bg-indigo-300'} hover:bg-indigo-300 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
    </form>
  )
}
