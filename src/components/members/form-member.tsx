'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Constants
import { API_URL, MSG_ADDING, MSG_EDITING } from '@/constants/constants'

export default function FormMember ({ memberId = null }: { memberId?: string | null }): JSX.Element {
  const [isSending, setIsSending] = useState('')
  const [member, setMember] = useState({ photo: '', name: '', email: '', position: '', salary: 0 })
  const router = useRouter()
  const textBtn = memberId === null ? 'Add' : 'Edit'

  useEffect(() => {
    if (memberId !== null) {
      const getMember = async (): Promise<void> => {
        const res = await fetch(`${API_URL}/members/${memberId}`, { cache: 'no-cache' })
        const data: { photo: string, name: string, email: string, position: string, salary: number } = await res.json()
        setMember(data)
      }

      void getMember()
    }
  }, [memberId])

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setMember({
      ...member,
      [name]: value
    })
  }

  const handleMember = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      ...Object.fromEntries(formData),
      photo: '',
      salary: Number(formData.get('salary'))
    }
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
    <form onSubmit={(e) => { void handleMember(e) }} className='flex flex-col gap-2'>
      <label htmlFor="name" className="block text-lg font-medium">Name</label>
      <input onChange={handleChangeValues} type="text" name="name" placeholder='Type name' id="name" className="w-full py-1 px-2 rounded-md shadow-md" value={member?.name} />
      <label htmlFor="email" className="block text-lg font-medium">Email</label>
      <input onChange={handleChangeValues} type="email" name="email" placeholder='Type email' id="email" className="w-full py-1 px-2 rounded-md shadow-md" value={member?.email} />
      <label htmlFor="position" className="block text-lg font-medium">Position</label>
      <input onChange={handleChangeValues} type="text" name="position" placeholder='Type position' id="position" className="w-full py-1 px-2 rounded-md shadow-md" value={member?.position} />
      <label htmlFor="salary" className="block text-lg font-medium">Salary</label>
      <input onChange={handleChangeValues} type="number" name="salary" placeholder='Type salary' id="salary" className="w-full py-1 px-2 rounded-md shadow-md" value={member?.salary} />
      <button className={`w-full h-12 ${isSending === '' ? 'bg-background' : 'bg-background/50'} hover:bg-background/80 text-white rounded-md text-lg font-medium mt-4`}>{isSending === '' ? textBtn : isSending}</button>
    </form>
  )
}
