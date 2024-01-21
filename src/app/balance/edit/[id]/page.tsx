// Components
import FormInvestor from '../../form-balance'

export default function AddPage ({ params }: { params: { id: string } }): JSX.Element {
  const { id } = params

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Add</h1>
      <FormInvestor investorId={id} />
    </main>
  )
}
