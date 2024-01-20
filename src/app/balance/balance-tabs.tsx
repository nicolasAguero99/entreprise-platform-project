'use client'

import { useRouter } from 'next/navigation'

// Constants
import { TABS_BALANCE } from '@/constants/constants'

export default function BalanceTabs ({ tab }: { tab: string }): JSX.Element {
  console.log('tab', tab)

  const router = useRouter()

  const handleTab = (paramValue: string): void => {
    router.push(`?tab=${paramValue}`)
  }

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 my-8">
      {
        TABS_BALANCE.map(tabItem => (
          <li key={tabItem.value} className="me-2">
            <button onClick={() => { handleTab(tabItem.value) }} className={`${tab === tabItem.value ? 'bg-stone-800 text-blue-400' : ''} inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>{tabItem.name}</button>
          </li>
        ))
      }
    </ul>
  )
}
