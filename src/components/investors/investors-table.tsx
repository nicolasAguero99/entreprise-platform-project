// Types
import { type InvestorsDb, type Months, TypeToAction } from '@/types/types.d'

// Components
import DropdownAmountDate from './dropdown-amount-date'
import EditBtn from '@/components/edit-btn'
import DeleteBtn from '@/components/delete-btn'
import OrderByName from '@/components/order-by-name'
import OrderByDate from '@/components/order-by-date'

// Constants
import { TEXT_TABLE_DATE } from '@/constants/constants'

export default function InvestorsTable ({ data, month }: { data: InvestorsDb[] | any, month: Months }): JSX.Element {
  return (
    <div className="relative z-10 my-6">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
        <thead className="text-xs uppercase bg-background dark:bg-background">
          <tr className='text-white [&>th]:py-4 [&>th]:px-6'>
            <th scope="col" className="max-sm:hidden px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              <OrderByName />
            </th>
            <th scope="col" className="max-[420px]:hidden px-6 py-3">
              Amount
            </th>
            <th scope="col" className="max-md:hidden px-6 py-3">
              <OrderByDate text={TEXT_TABLE_DATE[1]} />
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            data?.map(({ id, name, investorsHistory }: InvestorsDb) => {
              let amountByDate: Array<{ amount: number, investedIn: string }> = []
              if (month === undefined) {
                amountByDate = investorsHistory.filter(data => data.investorId === id).map(({ amount, investedIn }) => ({ amount, investedIn: (investedIn !== undefined ? investedIn.toLocaleString().split('T')[0] : '-') }))
              } else {
                amountByDate = investorsHistory.filter(data => new Date(data.investedIn).getMonth() + 1 === Number(month)).map(({ amount, investedIn }) => ({ amount, investedIn: (investedIn !== undefined ? investedIn.toLocaleString().split('T')[0] : '-') }))
              }
              const totalAmountInvested = month === undefined
                ? (investorsHistory.length > 0 ? investorsHistory.filter(data => data.investorId === id)?.reduce((acc, curr) => acc + curr.amount, 0) : '-')
                : (amountByDate.length > 0 ? amountByDate?.reduce((acc, curr) => acc + curr.amount, 0) : '-')
              const amountValue = Number(totalAmountInvested) > 0 ? `+${totalAmountInvested}` : totalAmountInvested
              return (
                <tr key={id} className="bg-white border-b text-black">
                  <td className="max-sm:hidden p-6">{id}</td>
                  <th scope="row" className="p-6 font-medium text-gray-900 whitespace-nowrap">{name}</th>
                  <td scope="row" className={`max-[420px]:hidden p-6 font-medium text-gray-900 whitespace-nowrap ${Number(amountValue) > 0 ? 'dark:text-green-400' : Number(amountValue) < 0 ? 'dark:text-red-500' : 'dark:text-yellow-500'}`}>
                    {amountValue}
                  </td>
                  <DropdownAmountDate amountByDate={amountByDate} />
                  <td scope="row" className='flex gap-2 items-center pe-4'>
                    <EditBtn id={id} typeToEdit={TypeToAction.INVESTORS} />
                    <DeleteBtn id={id} typeToDelete={TypeToAction.INVESTORS} />
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
