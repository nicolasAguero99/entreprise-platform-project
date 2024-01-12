'use client'

// Components
import DeleteBtn from '@/components/delete-btn'
import EditBtn from '@/components/edit-btn'

// Types
import { type MembersDb } from '@/types/types'

export default function MembersTable ({ data }: { data: MembersDb[] | any }): JSX.Element {
  return (
    <ul className="flex flex-col divide-y-[1px] divide-gray-300 py-4">
      {
        data?.map(({ id, name, email, createdAt }: MembersDb) => {
          const [memberCreatedAt] = new Date(createdAt).toISOString().split('T')
          return (
            <li key={id} className="flex text-center items-center gap-4 py-2">
              <small className="w-8 text-lg font-medium">{id}</small>
              <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{name}</span>
              <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{email}</span>
              <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{memberCreatedAt}</span>
              <div className='flex items-center gap-2'>
                <EditBtn memberId={id} />
                <DeleteBtn memberId={id} />
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}
