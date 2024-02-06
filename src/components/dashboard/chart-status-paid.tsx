'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Constants
import { COLORS_CHART } from '@/constants/constants'

export default function ChartStatusPaid ({ statePaids }: { statePaids: Array<{ paid: boolean }> }): JSX.Element {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const { paided, unpaided } = statePaids?.reduce(
    (accumulator, { paid }) => ({
      paided: accumulator.paided + Number(paid),
      unpaided: accumulator.unpaided + Number(!paid)
    }),
    { paided: 0, unpaided: 0 }
  )

  const total = paided + unpaided
  const percentage = total !== 0 ? ((unpaided / total) * 100).toFixed(0) : 0
  const remainingPercentage = 100 - Number(percentage)

  const data = {
    labels: [
      'Paid',
      'Unpaid'
    ],
    datasets: [{
      label: 'Amount of paid salaries',
      data: [paided, unpaided],
      backgroundColor: [
        COLORS_CHART[0],
        COLORS_CHART[1]
      ],
      hoverOffset: 4,
      borderWidth: 4,
      cutout: '80%'
    }]
  }

  const options: any = {
    color: '#000',
    reponsive: true,
    maintainAspectRatio: true,
    fill: true,
    plugins: {
      legend: {
        display: false
      }
    },
    rotation: 180
  }

  return (
    <div className='flex flex-col gap-6 relative z-10 w-full h-full py-10 px-6 max-md:border-none max-lg:border-e-2 max-lg:border-gray-100'>
      <h2 className='font-semibold text-xl text-center min-h-[58px]'>Paid salaries</h2>
      <div className='max-[340px]:hidden w-[200px] h-[200px] mx-auto max-sm:px-4'>
        <Doughnut data={data} options={options} />
      </div>
      <div className='w-full flex justify-center sm:justify-between flex-wrap gap-4 xl:px-12'>
        <div className='font-bold text-background text-3xl'>{remainingPercentage}%</div>
        <div className='font-bold text-primary text-3xl'>{percentage}%</div>
      </div>
    </div>
  )
}
