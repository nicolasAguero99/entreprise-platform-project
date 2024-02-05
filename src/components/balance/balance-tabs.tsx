'use client'

import { useRouter } from 'next/navigation'

// Constants
import { TABS_BALANCE } from '@/constants/constants'

// Types
import { type TabsBalanceParams } from '@/types/types'

export default function BalanceTabs ({ tab = TABS_BALANCE[0].value as TabsBalanceParams }: { tab: TabsBalanceParams }): JSX.Element {
  const router = useRouter()

  const handleTab = (paramValue: string): void => {
    router.push(`?tab=${paramValue}`)
  }

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-black my-8">
      {
        TABS_BALANCE.map(tabItem => (
          <li key={tabItem.value} className="me-2">
            <button onClick={() => { handleTab(tabItem.value) }} className={`${tab === tabItem.value ? 'text-black border-b border-black' : 'text-gray-500'} inline-block p-4 rounded-t-lg hover:text-gray-700`}>{tabItem.name}</button>
          </li>
        ))
      }
    </ul>
  )
}
