// Comments
import PayButton from '@/components/pay-button'

// Types
import { type MembersDb } from '@/types/types'

export default function InvoicesTable ({ data }: { data: MembersDb[] }): JSX.Element {
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
            Position
          </th>
          <th scope="col" className="px-6 py-3">
            Salary
          </th>
          <th scope="col" className="px-6 py-3">
            State
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data?.map(({ id, name, position, salary, paid }: MembersDb) => {
            const salaryFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)
            const paidText = paid ? 'Paid' : 'Pending'
            return (
              <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{name}</th>
                <td className="px-6 py-4 capitalize">{position}</td>
                <td className="px-6 py-4">{salaryFormat}</td>
                <td className="px-6 py-4">{paidText}</td>
                <td className="px-6 py-4"><PayButton memberId={id} paid={paid} /></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  )
}
