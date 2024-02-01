// Components
import CardDataHeader from './card-data-header'
import ChartStatusPaid from '@/components/dashboard/chart-status-paid'
import ChartInvestments from '@/components/dashboard/chart-investments'
import ChartProfitable from '@/components/dashboard/chart-profitable'
import ChartBalance from './chart-balance'
import ChartBalanceInvestments from './chart-balance-investments'

// Services
import { getBalanceAmounts, getBalanceInvesments, getBalanceTotal, getInvestmentsByMonth, getLatestAction, getLatestInvestment, getProfitable, getStatesPaidsMembers } from '@/lib/services'

export default async function Dashboard (): Promise<JSX.Element> {
  const statePaids: Array<{ paid: boolean }> = await getStatesPaidsMembers()
  const investments: number[] = await getInvestmentsByMonth()
  const profitable: number[] = await getProfitable()
  const balance: Array<{ amount: number }> = await getBalanceAmounts()
  const balanceInvestments: Array<{ amount: number }> = await getBalanceInvesments()
  const balanceTotal: number = await getBalanceTotal()
  const latestInvestment: number = await getLatestInvestment()
  const latestAction: number = await getLatestAction()

  return (
    <main className="w-full">
      <div className="flex flex-col gap-4">
        <section className="flex gap-4 justify-center items-center">
          <CardDataHeader data={balanceTotal} type={'balanceTotal'} />
          <CardDataHeader data={latestInvestment} type={'latestInvestment'} />
          <CardDataHeader data={latestAction} type={'latestAction'} />
        </section>
        <section className="flex flex-col gap-4">
          <div className='grid grid-cols-3 bg-white rounded-lg shadow-md divide-x-2 divide-gray-100 py-4'>
            <ChartStatusPaid statePaids={statePaids} />
            <ChartBalance balance={balance} />
            <ChartBalanceInvestments balanceInvestments={balanceInvestments} />
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
