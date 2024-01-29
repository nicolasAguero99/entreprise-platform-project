// Components
import CardDataHeader from './card-data-header'
import ChartStatusPaid from '@/components/dashboard/chart-status-paid'
import ChartInvestments from '@/components/dashboard/chart-investments'
import ChartProfitable from '@/components/dashboard/chart-profitable'
import ChartBalance from './chart-balance'
import ChartPositions from './chart-positions-members'

// Services
import { getBalanceAmounts, getBalanceTotal, getInvestmentsByMonth, getPositionsMembers, getProfitable, getStatesPaidsMembers } from '@/lib/services'

// Types
import { type PositionCount } from '@/types/types'

export default async function Dashboard (): Promise<JSX.Element> {
  const statePaids: Array<{ paid: boolean }> = await getStatesPaidsMembers()
  const investments: number[] = await getInvestmentsByMonth()
  const profitable: number[] = await getProfitable()
  const balance: Array<{ amount: number }> = await getBalanceAmounts()
  const positions: PositionCount[] = await getPositionsMembers()
  const balanceTotal: number = await getBalanceTotal()

  return (
    <main className="w-full">
      <div className="flex flex-col gap-4">
        <section className="flex gap-4 justify-center items-center">
          <CardDataHeader data={balanceTotal} type={'balanceTotal'} />
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">ff</h2>
          <div className='grid grid-cols-3 gap-4'>
            <ChartStatusPaid statePaids={statePaids} />
            <ChartBalance balance={balance} />
            <ChartPositions positions={positions} />
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
