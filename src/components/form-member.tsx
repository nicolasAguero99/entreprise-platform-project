'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING } from '@/constants/constants'

// Types
import { type MembersDb } from '@/types/types'

export default function FormMember ({ memberId = null }: { memberId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [member, setMember] = useState({ photo: '', name: '', email: '', position: '', salary: 0, paid: false })
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
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setMember({
        ...member,
        [name]: checked
      })
    } else {
      setMember({
        ...member,
        [name]: value
      })
    }
  }

  const handleMember = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      ...Object.fromEntries(formData),
      photo: '',
      salary: Number(formData.get('salary'))
    }
    console.log('data', data)
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
      <label htmlFor="photo" className="block text-lg font-medium">Photo</label>
      {/* <input type="file" name="photo" id="photo" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" /> */}
      <label htmlFor="name" className="block text-lg font-medium">Name</label>
      <input onChange={handleChangeValues} type="text" name="name" placeholder='Type name' id="name" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={member?.name} />
      <label htmlFor="email" className="block text-lg font-medium">Email</label>
      <input onChange={handleChangeValues} type="email" name="email" placeholder='Type email' id="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={member?.email} />
      <label htmlFor="position" className="block text-lg font-medium">Position</label>
      <input onChange={handleChangeValues} type="text" name="position" placeholder='Type position' id="position" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={member?.position} />
      <label htmlFor="salary" className="block text-lg font-medium">Salary</label>
      <input onChange={handleChangeValues} type="number" name="salary" placeholder='Type salary' id="salary" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={member?.salary} />
      {/* <label htmlFor="paid" className="block text-lg font-medium">Paid</label>
      <input onChange={handleChangeValues} type="checkbox" name="paid" placeholder='Type paid' id="paid" className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" checked={member.paid} /> */}
      <button className={`w-full h-12 ${isSending === '' ? 'bg-indigo-500' : 'bg-indigo-300'} hover:bg-indigo-300 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
    </form>
  )
}
