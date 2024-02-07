'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Constants
import { SIDEBAR_LINKS } from '@/constants/constants'

export default function Sidebar (): JSX.Element {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  const handleToggleMenu = (): void => { setShowMenu(!showMenu) }

  return (
    <div className='fixed max-lg:top-0 max-lg:left-0 lg:relative z-50'>
      <button onClick={handleToggleMenu} className='fixed top-0 left-0 lg:hidden ms-8 mt-8 bg-background p-1 rounded-lg'>
        <Image src='/menu-icon.svg' alt='open menu' width={34} height={34} />
      </button>
      <aside className={`${showMenu ? 'block' : 'hidden'} z-40 w-64 h-screen transition-transform relative top-0 max-lg:left-0 lg:block`}>
        <nav className='fixed w-56 h-screen px-3 py-4 overflow-y-auto bg-background'>
          <ul className='space-y-2 font-medium text-white'>
            <div className='flex justify-between items-center gap-4 p-2 mt-2 mb-6'>
              <li className='text-xl font-semibold'>Your company</li>
              <button onClick={handleToggleMenu} className='block lg:hidden'><Image src='/cross-icon.svg' alt='close menu' width={25} height={25} /></button>
            </div>
            {
              SIDEBAR_LINKS.map(link => (
                <li key={link.name}>
                  <Link href={link.path} className={`${pathname === link.path ? 'bg-white/20' : ''} flex items-center p-2 rounded-lg text-white hover:bg-white/20`}>
                    <span className='ms-3'>{link.name}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </aside>
      <div onClick={handleToggleMenu} className={`${showMenu ? 'block' : 'hidden'} w-full h-full fixed top-0 left-0 bg-black/30 cursor-pointer z-20`}></div>
    </div>
  )
}
