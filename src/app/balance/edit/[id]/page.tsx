// Components
import FormInvestor from '../../../../components/balance/form-balance'

export default function AddPage ({ params }: { params: { id: string } }): JSX.Element {
  const { id } = params

  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold mt-20 lg:mt-4 mb-8">Edit</h1>
      <FormInvestor balanceId={id} />
    </main>
  )
}
