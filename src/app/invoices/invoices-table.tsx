// Components
import OrderByName from '@/components/order-by-name'
import PayButton from '@/components/pay-button'

// Types
import { type InvoicesDb } from '@/types/types'

export default function InvoicesTable ({ data }: { data: InvoicesDb[] }): JSX.Element {
  return (
    <div className="relative z-20 overflow-x-auto my-6">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-background dark:bg-background">
        <tr className='text-white [&>th]:py-4 [&>th]:px-6'>
          <th scope="col">
            Id
          </th>
          <th scope="col">
            <OrderByName />
          </th>
          <th scope="col">
            Position
          </th>
          <th scope="col">
            Salary
          </th>
          <th scope="col">
            State
          </th>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {
          data?.map(({ id, name, position, salary, paid }: InvoicesDb) => {
            const salaryFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)
            return (
              <tr key={id} className="bg-white border-b text-black">
                <td className="p-6">{id}</td>
                <th scope="row" className="p-6 font-semibold text-gray-900 whitespace-nowrap">{name}</th>
                <td className="p-6 capitalize text-gray-500">{position}</td>
                <td className="p-6 text-gray-500">{salaryFormat}</td>
                <td className="p-6"><PayButton memberId={id} paid={paid} /></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
  )
}
