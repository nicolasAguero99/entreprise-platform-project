'use client'
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
    console.log('res', res)
    if (res.ok) {
      router.refresh()
      console.log('ok')
    } else {
      console.log('error')
    }
  }

  return (
    <button onClick={() => { void handleDelete() }} className={`size-8 ${!isDeleting ? 'bg-red-500' : 'bg-red-300'} rounded-full flex items-center justify-center`}>
      {
        !isDeleting
          ? <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 5a1 1 0 011-1h6a1 1 0 011 1v1h3a1 1 0 110 2h-.586l-.894 9.458A2 2 0 0112.52 18H7.48a2 2 0 01-1.99-1.542L4.596 8H4a1 1 0 110-2h3V5zm2 2v9h4V7H8z" clipRule="evenodd" />
            </svg>
          : <Loader size='size-5' />
      }
    </button>
  )
}
