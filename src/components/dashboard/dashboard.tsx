// Components
import ChartStatusPaid from '@/components/dashboard/chart-status-paid'
import ChartInvestments from '@/components/dashboard/chart-investments'
import ChartProfitable from '@/components/dashboard/chart-profitable'

// Services
import { getInvestmentsByMonth, getProfitable, getStatesPaidsMembers } from '@/lib/services'

export default async function Dashboard (): Promise<JSX.Element> {
  const statePaids: Array<{ paid: boolean }> = await getStatesPaidsMembers()
  const investments: number[] = await getInvestmentsByMonth()
  const profitable: number[] = await getProfitable()

  return (
    <main className="w-full">
      <div className="flex flex-col gap-4">
        <section className="flex gap-4 justify-center items-center">
          <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
            <span className="font-semibold text-xl">Info. Card</span>
            <span>details...</span>
            <small className="text-green-7000">+25%</small>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
            <span className="font-semibold text-xl">Info. Card</span>
            <span>details...</span>
            <small className="text-green-7000">+25%</small>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4 bg-slate-200 text-black rounded-md">
            <span className="font-semibold text-xl">Info. Card</span>
            <span>details...</span>
            <small className="text-green-7000">+25%</small>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">ff</h2>
          <div className='grid grid-cols-3 gap-4'>
            <ChartStatusPaid statePaids={statePaids} />
            <ChartStatusPaid statePaids={statePaids} />
            <ChartStatusPaid statePaids={statePaids} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <ChartInvestments investments={investments} />
            <ChartProfitable profitable={profitable} />
          </div>
        </section>
      </div>
    </main>
  )
}
