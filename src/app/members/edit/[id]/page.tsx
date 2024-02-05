import FormMember from '../../form-member'

export default function MembersPage ({ params }: { params: { id: string } }): JSX.Element {
  console.log('params', params)
  const { id } = params

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold mt-20 lg:mt-4 mb-8">Edit</h1>
      <FormMember memberId={id} />
    </main>
  )
}
