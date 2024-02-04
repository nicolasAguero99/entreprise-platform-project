'use client'

// Components
import DeleteBtn from '@/components/delete-btn'
import EditBtn from '@/components/edit-btn'
import OrderByName from './order-by-name'
import OrderByDate from './order-by-date'

// Types
import { TypeToAction, type MembersDb } from '@/types/types.d'

// Constants
import { TEXT_TABLE_DATE } from '@/constants/constants'

export default function MembersTable ({ data }: { data: MembersDb[] | any }): JSX.Element {
  return (
    <div className="relative z-10 my-6">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-background dark:bg-background">
          <tr className='text-white [&>th]:py-4 [&>th]:px-6'>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              <OrderByName />
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              <OrderByDate text={TEXT_TABLE_DATE[0]} />
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            data?.map(({ id, name, email, createdAt }: MembersDb) => {
              const [memberCreatedAt] = new Date(createdAt).toISOString().split('T')
              return (
                <tr key={id} className="bg-white border-b text-black">
                  <td className="p-6">{id}</td>
                  <th scope="row" className="p-6 font-semibold text-gray-900 whitespace-nowrap">{name}</th>
                  <td className="p-6 capitalize text-gray-500">{email}</td>
                  <td className="p-6 capitalize text-gray-500">{memberCreatedAt}</td>
                  <td className='flex items-center gap-2'>
                    <EditBtn id={id} typeToEdit={TypeToAction.MEMBERS} />
                    <DeleteBtn id={id} typeToDelete={TypeToAction.MEMBERS} />
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
