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
        <section className="flex max-md:flex-col gap-4 justify-center items-center">
          <CardDataHeader data={balanceTotal} type={'balanceTotal'} />
          <CardDataHeader data={latestInvestment} type={'latestInvestment'} />
          <CardDataHeader data={latestAction} type={'latestAction'} />
        </section>
        <section className="flex flex-col gap-4">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center bg-white rounded-lg shadow-md max-md:divide-y-2 lg:divide-x-2 divide-gray-100 py-4 max-sm:px-2 max-lg:px-10 overflow-x-auto'>
            <ChartStatusPaid statePaids={statePaids} />
            <ChartBalance balance={balance} />
            <div className="flex items-center justify-center md:col-span-2 lg:col-span-1">
              <ChartBalanceInvestments balanceInvestments={balanceInvestments} />
            </div>
          </div>
          <div className='grid xl:grid-cols-2 gap-4'>
            <ChartInvestments investments={investments} />
            <ChartProfitable profitable={profitable} />
          </div>
        </section>
      </div>
    </main>
  )
}
