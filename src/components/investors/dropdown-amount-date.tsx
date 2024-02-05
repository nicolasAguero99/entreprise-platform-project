'use client'

import { useState } from 'react'

export default function DropdownAmountDate ({ amountByDate }: { amountByDate: Array<{ amount: number, investedIn: string }> }): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false)
  const handleToggleDropdown = (): void => {
    setShowDropdown(!showDropdown)
  }

  return (
    <td onClick={handleToggleDropdown} scope="row" className={`${amountByDate.length > 1 ? 'cursor-pointer' : ''} max-md:hidden relative px-6 py-4 font-medium text-gray-500 whitespace-nowrap`}>
      <span className='flex gap-2 items-center'>
        {
          amountByDate.length > 1
            ? (
                <>
                  All dates
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${showDropdown ? 'rotate-180' : ''} size-3`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </>
              )
            : amountByDate[0]?.investedIn ?? '-'
        }
      </span>
      {
        amountByDate.length > 1 && (
          <div className={`${!showDropdown ? 'hidden' : ''} absolute w-full top-12 -left-6 bg-white shadow-md rounded-lg z-40`}>
            <ul className='divide-y divide-gray-300 text-center px-6'>
              {
                amountByDate.map((item, index: number) => (
                  <li key={index} className='py-4 font-medium'>
                    (<span className={`${Number(item.amount) > 0 ? 'text-green-400' : Number(item.amount) < 0 ? 'text-red-500' : 'text-yellow-500'}`}>{Number(item.amount) > 0 ? `+${item.amount}` : item.amount}</span>) - <span>{item.investedIn}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </td>
  )
}
