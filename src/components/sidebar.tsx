'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Constants
import { SIDEBAR_LINKS } from '@/constants/constants'

export default function Sidebar (): JSX.Element {
  const pathname = usePathname()

  return (
    <aside
      id='default-sidebar'
      className='z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          {
            SIDEBAR_LINKS.map(link => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className='flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  >
                  <span className={`${pathname === link.path ? 'text-pink-600' : ''} ms-3`}>{link.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </aside>
  )
}
