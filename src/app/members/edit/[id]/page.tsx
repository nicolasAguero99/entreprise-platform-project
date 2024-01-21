import FormMember from '../../form-member'

export default function MembersPage ({ params }: { params: { id: string } }): JSX.Element {
  console.log('params', params)
  const { id } = params

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Edit</h1>
      <FormMember memberId={id} />
    </main>
  )
}
