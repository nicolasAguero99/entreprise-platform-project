// Components
import FormInvestor from '../form-investor'

export default function AddPage (): JSX.Element {
  return (
    <main className="flex flex-col flex-1 px-8 py-4">
      <h1 className="text-3xl font-semibold">Add</h1>
      <FormInvestor />
    </main>
  )
}
