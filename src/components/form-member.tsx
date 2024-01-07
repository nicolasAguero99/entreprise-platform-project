'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING } from '@/constants/constants'

// Types
import { type MembersDb } from '@/types/types'

export default function FormMember ({ memberId = null }: { memberId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [member, setMember] = useState({ name: '', email: '' })
  const router = useRouter()
  const textBtn = memberId === null ? 'Add' : 'Edit'

  useEffect(() => {
    if (memberId !== null) {
      const getMember = async (): Promise<void> => {
        const res = await fetch(`${API_URL}/members/${memberId}`, { cache: 'no-cache' })
        const data: MembersDb = await res.json()
        setMember({ ...data })
      }

      void getMember()
    }
  }, [memberId])

  useEffect(() => {
    console.log('member', member)
  }, [member])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setMember({
      ...member,
      [name]: value
    })
  }

  const handleMember = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    setIsSending(MSG_ADDING)
    let res = null

    if (memberId === null) {
      res = await fetch(`${API_URL}/members`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      console.log('data', data)
      setIsSending(MSG_EDITING)
      res = await fetch(`${API_URL}/members/${memberId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    if (res.ok) {
      router.push('/members')
      router.refresh()
    } else {
      console.log('error')
    }
  }

  return (
    <form onSubmit={(e) => { void handleMember(e) }}>
      <label htmlFor="name" className="block text-lg font-medium">Name</label>
      <input onChange={handleChangeValues} type="text" name="name" placeholder='Type name' id="name" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={member?.name} />
      <label htmlFor="email" className="block text-lg font-medium">Email</label>
      <input onChange={handleChangeValues} type="email" name="email" placeholder='Type email' id="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={member?.email} />
      <button className={`w-full h-12 ${isSending === '' ? 'bg-indigo-500' : 'bg-indigo-300'} hover:bg-indigo-300 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
    </form>
  )
}
