'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING } from '@/constants/constants'

// Types
import { type InvestorsHistoryDb, type InvestorsDb } from '@/types/types'

export default function FormInvestor ({ investorId = null }: { investorId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [investor, setInvetors] = useState({ photo: '', name: '', amount: '', investedIn: '' })
  const router = useRouter()
  const textBtn = investorId === null ? 'Add' : 'Edit'

  // useEffect(() => {
  //   if (investorId !== null) {
  //     const getMember = async (): Promise<void> => {
  //       const res = await fetch(`${API_URL}/investors/${investorId}`, { cache: 'no-cache' })
  //       const data: InvestorsDb[] | InvestorsHistoryDb[] = await res.json()
  //       setInvetors({ ...data })
  //     }

  //     void getMember()
  //   }
  // }, [investorId])

  useEffect(() => {
    console.log('investor', investor)
  }, [investor])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInvetors({
      ...investor,
      [name]: value
    })
  }

  const handleInvestors = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      ...Object.fromEntries(formData),
      photo: '',
      investedIn: new Date(Object.fromEntries(formData).investedIn).toISOString(),
      amount: Number(Object.fromEntries(formData).amount)
    }
    console.log('data', data)
    setIsSending(MSG_ADDING)
    let res = null

    if (investorId === null) {
      res = await fetch(`${API_URL}/investors`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      console.log('data', data)
      setIsSending(MSG_EDITING)
      res = await fetch(`${API_URL}/investors/${investorId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    if (res.ok) {
      router.push('/investors')
      router.refresh()
    } else {
      console.log('error')
    }
  }

  return (
    <form onSubmit={(e) => { void handleInvestors(e) }}>
      <label htmlFor="photo" className="block text-lg font-medium">Photo</label>
      {/* <input type="file" name="photo" id="photo" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" /> */}
      <label htmlFor="name" className="block text-lg font-medium">Name</label>
      <input onChange={handleChangeValues} type="text" name="name" placeholder='Type name' id="name" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor?.name} />
      <label htmlFor="amount" className="block text-lg font-medium">Amount</label>
      <input onChange={handleChangeValues} type="number" name="amount" placeholder='Type amount' id="amount" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor?.amount} />
      <label htmlFor="investedIn" className="block text-lg font-medium">Invested in</label>
      <input onChange={handleChangeValues} type="date" name="investedIn" placeholder='Type investedIn' id="investedIn" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={investor?.investedIn} />
      <button className={`w-full h-12 ${isSending === '' ? 'bg-indigo-500' : 'bg-indigo-300'} hover:bg-indigo-300 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
    </form>
  )
}
