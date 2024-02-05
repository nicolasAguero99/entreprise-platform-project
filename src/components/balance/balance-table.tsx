// Types
import { TypeToAction, type BalanceDb, type TabsBalanceParams } from '@/types/types.d'

// Components
import EditBtn from '@/components/edit-btn'
import DeleteBtn from '@/components/delete-btn'
import OrderByName from '@/components/order-by-name'
import OrderByDate from '@/components/order-by-date'

// Constants
import { TABS_BALANCE, TEXT_TABLE_DATE } from '@/constants/constants'

// Services

export default async function BalanceTable ({ data, tab = TABS_BALANCE[0].value as TabsBalanceParams }: { data: BalanceDb[], tab: TabsBalanceParams }): Promise<JSX.Element> {
  const filteredData = (data)?.filter(({ amount }) => {
    return (tab === TABS_BALANCE[1].value && amount > 0) || (tab === TABS_BALANCE[2].value && amount < 0) || (tab === TABS_BALANCE[0].value)
  })

  return (
    <div className="relative z-10 overflow-x-auto my-6">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-background dark:bg-background">
          <tr className='text-white [&>th]:py-4 [&>th]:px-6'>
            <th className='max-sm:hidden' scope="col">
              Id
            </th>
            <th scope="col">
              <OrderByName />
            </th>
            <th className='max-[460px]:hidden' scope="col">
              Amount
            </th>
            <th className='max-md:hidden' scope="col">
              <OrderByDate text={TEXT_TABLE_DATE[0]} />
            </th>
            <th scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            filteredData?.map(({ id, action, amount, date }: BalanceDb) => {
              const [memberCreatedAt] = new Date(date).toISOString().split('T')
              const amountText = amount > 0 ? `+${amount.toLocaleString('en-US')}` : `${amount.toLocaleString('en-US')}`
              return (
                <tr key={id} className="bg-white border-b text-black">
                  <td className="max-sm:hidden p-6">{id}</td>
                  <th scope="row" className="p-6 font-semibold text-black">{action}</th>
                  <td scope="row" className={`max-[460px]:hidden p-6 font-medium text-black ${Number(amount) > 0 ? 'text-green-400' : Number(amount) < 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                    {amountText}
                  </td>
                  <td className="max-md:hidden p-6 text-gray-500">{memberCreatedAt}</td>
                  <td scope="row" className='flex gap-2 items-center'>
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
