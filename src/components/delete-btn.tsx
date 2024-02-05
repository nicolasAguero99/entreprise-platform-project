'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Constants
import { API_URL } from '@/constants/constants'

// Components
import Loader from './loader'

// Types
import { type TypeToAction } from '@/types/types'

export default function DeleteBtn ({ id, typeToDelete }: { id: number, typeToDelete: TypeToAction }): JSX.Element {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (): Promise<void> => {
    setIsDeleting(true)
    const res = await fetch(`${API_URL}/${typeToDelete}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      router.refresh()
    } else {
      console.log('error')
    }
  }

  return (
    <button onClick={() => { void handleDelete() }} className='size-8 rounded-full flex items-center justify-center'>
      {
        !isDeleting
          ? <Image src='/trash-icon.svg' alt='delete' width={23} height={23} />
          : <Loader size='size-5' />
      }
    </button>
  )
}
