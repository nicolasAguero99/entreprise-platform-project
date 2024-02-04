import Link from 'next/link'
import Image from 'next/image'

// Types
import { type TypeToAction } from '@/types/types'

export default function EditBtn ({ id, typeToEdit }: { id: number, typeToEdit: TypeToAction }): JSX.Element {
  return (
    <Link href={`/${typeToEdit}/edit/${id}`} className='flex px-2 py-4'>
      <Image src='/pencil-icon.svg' alt='edit' width={23} height={23} />
    </Link>
  )
}
