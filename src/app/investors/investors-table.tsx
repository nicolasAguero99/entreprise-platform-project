// Types
import { type InvestorsDb, type Months, TypeToAction } from '@/types/types.d'

// Components
import DropdownAmountDate from './dropdown-amount-date'
import EditBtn from '@/components/edit-btn'
import DeleteBtn from '@/components/delete-btn'

export default function InvestorsTable ({ data, month }: { data: InvestorsDb[] | any, month: Months }): JSX.Element {
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
          data?.map(({ id, name, investorsHistory }: InvestorsDb) => {
            // let investedInByDate
            let amountByDate: Array<{ amount: number, investedIn: string }> = []
            // let investedInDate
            let totalAmountInvested
            if (month === undefined) {
              // investedInByDate = '-'
              amountByDate = investorsHistory.filter(data => data.investorId === id).map(({ amount, investedIn }) => ({ amount, investedIn: (investedIn !== undefined ? investedIn.toLocaleString().split('T')[0] : '-') }))
              totalAmountInvested = investorsHistory.length > 0 ? investorsHistory.filter(data => data.investorId === id)?.reduce((acc, curr) => acc + curr.amount, 0) : '-'
              // investedInDate = investorsHistory.filter(data => data.investorId === id).map(data => data.investedIn.toLocaleString().split('T')[0])
              // investedInDate = investedInByDate !== undefined ? investedInByDate.toLocaleString().split('T')[0] : '-'
            } else {
              // investedInByDate = investorsHistory.filter(data => new Date(data.investedIn).getMonth() + 1 === Number(month))
              // amountByDate = investedInByDate.length > 1 ? investedInByDate.reduce((acc, curr) => acc + curr.amount, 0) : investedInByDate[0]?.amount ?? '-'
              // investedInDate = investedInByDate[0]?.investedIn !== undefined ? investedInByDate[0]?.investedIn.toLocaleString().split('T')[0] : '-'
            }
            const amountValue = Number(totalAmountInvested) > 0 ? `+${totalAmountInvested}` : totalAmountInvested
            return (
              <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{name}</th>
                <td scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${Number(amountValue) > 0 ? 'dark:text-green-400' : Number(amountValue) < 0 ? 'dark:text-red-500' : 'dark:text-yellow-500'}`}>
                  {amountValue}
                </td>
                <DropdownAmountDate amountByDate={amountByDate} />
                <td scope="row" className='flex gap-2 items-center justify-end pe-4'>
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
