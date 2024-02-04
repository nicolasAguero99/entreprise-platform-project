// Components
import Dashboard from '@/components/dashboard/dashboard'

export default function Home (): JSX.Element {
  return (
    <div className='flex flex-col flex-1 px-8 py-4'>
      <h1 className="text-3xl font-semibold 
mt-20 lg:mt-4 mb-8">Dashboard</h1>
      <Dashboard />
    </div>
  )
}
