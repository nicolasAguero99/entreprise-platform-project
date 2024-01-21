// Types
import { TypeToAction, type BalanceDb, type TabsBalanceParams } from '@/types/types.d'

// Components
import EditBtn from '@/components/edit-btn'
import DeleteBtn from '@/components/delete-btn'

// Services
import { getBalance } from '@/lib/services'
import { TABS_BALANCE } from '@/constants/constants'

export default async function BalanceTable ({ tab = TABS_BALANCE[0].value as TabsBalanceParams }: { tab: TabsBalanceParams }): Promise<JSX.Element> {
  const data = await getBalance()
  const filteredData = data?.filter(({ amount }: BalanceDb) => {
    return (tab === TABS_BALANCE[1].value && amount > 0) || (tab === TABS_BALANCE[2].value && amount < 0) || (tab === TABS_BALANCE[0].value)
  })

  return (
    <div className="relative my-6">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Id
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Invested in
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {
          filteredData?.map(({ id, action, amount, date }: BalanceDb) => {
            const [memberCreatedAt] = new Date(date).toISOString().split('T')
            const amountText = amount > 0 ? `+${amount.toLocaleString('en-US')}` : `${amount.toLocaleString('en-US')}`
            return (
              <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{action}</th>
                <td scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${Number(amount) > 0 ? 'dark:text-green-400' : Number(amount) < 0 ? 'dark:text-red-500' : 'dark:text-yellow-500'}`}>
                  {amountText}
                </td>
                <td className="px-6 py-4">{memberCreatedAt}</td>
                <td scope="row" className='flex gap-2 items-center justify-end pe-4'>
                  <EditBtn id={id} typeToEdit={TypeToAction.BALANCE} />
                  <DeleteBtn id={id} typeToDelete={TypeToAction.BALANCE} />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  )
}
