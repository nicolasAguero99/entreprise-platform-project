import { revalidatePath } from 'next/cache'

// Types
import { type MembersDb } from '@/types/types'

// Constants
import { API_URL } from '@/constants/constants'

// eslint-disable-next-line @next/next/no-async-client-component
export default async function MembersPage (): Promise<JSX.Element> {
  const response = await fetch(`${API_URL}/members`)
  const data = await response.json()

  // const handleAddMember = async (): Promise<void> => {
  //   const res = await fetch(`${API_URL}/members`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: 'Mónica Hernández',
  //       email: 'monica@gmail.com'
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const data = await res.json()
  //   console.log(data)
  //   revalidatePath('/members')
  // }

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Members</h1>
      {/* <button onClick={handleAddMember}>Agregar</button> */}
      <section className="py-4">
        <ul className="flex flex-col divide-y-[1px] divide-gray-300">
          {
            data.map(({ id, name, email, createdAt }: MembersDb) => {
              const [memberCreatedAt] = new Date(createdAt).toISOString().split('T')
              return (
                <li key={id} className="flex text-center items-center gap-4 py-2">
                  <small className="w-8 text-lg font-medium">{id}</small>
                  <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{name}</span>
                  <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{email}</span>
                  <span className="w-28 flex-1 text-lg font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">{memberCreatedAt}</span>
                </li>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}
