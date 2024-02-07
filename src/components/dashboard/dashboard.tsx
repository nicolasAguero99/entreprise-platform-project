'use client'

import { useEffect, useState } from 'react'

// Components
import CardDataHeader from './card-data-header'
import ChartStatusPaid from '@/components/dashboard/chart-status-paid'
import ChartInvestments from '@/components/dashboard/chart-investments'
import ChartProfitable from '@/components/dashboard/chart-profitable'
import ChartBalance from './chart-balance'
import ChartBalanceInvestments from './chart-balance-investments'
import LoadingDashboard from '../loading-dashboard'

// Services
import { getBalanceAmounts, getBalanceInvesments, getBalanceTotal, getInvestmentsByMonth, getLatestAction, getLatestInvestment, getProfitable, getStatesPaidsMembers } from '@/lib/services'

// Types
import { type DashboardData } from '@/types/types'

export default function Dashboard (): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<DashboardData>({
    statePaids: [],
    investments: [],
    profitable: [],
    balance: [],
    balanceInvestments: [],
    balanceTotal: 0,
    latestInvestment: 0,
    latestAction: 0
  })

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const statePaids = await getStatesPaidsMembers()
        const investments = await getInvestmentsByMonth()
        const profitable = await getProfitable()
        const balance = await getBalanceAmounts()
        const balanceInvestments = await getBalanceInvesments()
        const balanceTotal = await getBalanceTotal()
        const latestInvestment = await getLatestInvestment()
        const latestAction = await getLatestAction()

        setData({
          statePaids,
          investments,
          profitable,
          balance,
          balanceInvestments,
          balanceTotal,
          latestInvestment,
          latestAction
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    investments !== undefined && setLoading(false)

    void fetchData()
  }, [])

  useEffect(() => {
    console.log('loading', loading)
  }, [loading])

  const {
    statePaids,
    investments,
    profitable,
    balance,
    balanceInvestments,
    balanceTotal,
    latestInvestment,
    latestAction
  } = data

  return (
    <>
      {
        loading
          ? <LoadingDashboard />
          : <main className="w-full">
              <div className="flex flex-col gap-4">
                <section className="flex max-md:flex-col gap-4 justify-center items-center">
                  <CardDataHeader data={balanceTotal} type={'balanceTotal'} />
                  <CardDataHeader data={latestInvestment} type={'latestInvestment'} />
                  <CardDataHeader data={latestAction} type={'latestAction'} />
                </section>
                <section className="flex flex-col gap-4">
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center bg-white rounded-lg shadow-md max-md:divide-y-2 lg:divide-x-2 divide-gray-100 py-4 max-sm:px-2 max-lg:px-10'>
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
      }
    </>
  )
}
