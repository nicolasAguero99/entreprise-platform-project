// Types
import { type InvestorsDb, type Months } from '@/types/types'

export default function InvestorsTable ({ data, month }: { data: InvestorsDb[] | any, month: Months }): JSX.Element {
  return (
    <div className="relative overflow-x-auto my-6">
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
        </tr>
      </thead>
      <tbody>
        {
          data?.map(({ id, name, investorsHistory }: InvestorsDb) => {
            let investedInByDate
            let amountInvested: string | number = 0
            let investedInDate
            if (month === undefined) {
              investedInByDate = '-'
              amountInvested = investorsHistory.length > 0 ? investorsHistory.filter(data => data.investorId === id)?.reduce((acc, curr) => acc + curr.amount, 0) : '-'
              investedInDate = investedInByDate !== undefined ? investedInByDate.toLocaleString().split('T')[0] : '-'
            } else {
              investedInByDate = investorsHistory.filter(data => new Date(data.investedIn).getMonth() + 1 === Number(month))
              amountInvested = investedInByDate.length > 1 ? investedInByDate.reduce((acc, curr) => acc + curr.amount, 0) : investedInByDate[0]?.amount ?? '-'
              investedInDate = investedInByDate[0]?.investedIn !== undefined ? investedInByDate[0]?.investedIn.toLocaleString().split('T')[0] : '-'
            }
            const amountValue = Number(amountInvested) > 0 ? `+${amountInvested}` : amountInvested
            return (
              <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{name}</th>
                <td scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${Number(amountInvested) > 0 ? 'dark:text-green-400' : Number(amountInvested) < 0 ? 'dark:text-red-500' : 'dark:text-yellow-500'}`}>{amountValue}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{investedInDate}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  )
}
