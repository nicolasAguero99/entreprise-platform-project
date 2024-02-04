'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Services

export default function ChartStatusPaid ({ statePaids }: { statePaids: Array<{ paid: boolean }> }): JSX.Element {
  // console.log('statePaids', statePaids)

  ChartJS.register(ArcElement, Tooltip, Legend)

  const { paided, unpaided } = statePaids?.reduce(
    (accumulator, { paid }) => ({
      paided: accumulator.paided + Number(paid),
      unpaided: accumulator.unpaided + Number(!paid)
    }),
    { paided: 0, unpaided: 0 }
  )

  const percentage = Math.abs(unpaided) < paided
    ? ((Math.abs(unpaided) / paided) * 100).toFixed(0)
    : ((paided / Math.abs(unpaided)) * 100).toFixed(0)

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
        'lightgreen',
        'red'
      ],
      hoverOffset: 4,
      borderWidth: 4,
      cutout: '80%'
    }]
  }

  const options: any = {
    color: '#000',
    reponsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    rotation: 180
  }

  return (
    <div className='flex flex-col gap-6 relative z-10 w-full h-full py-10 px-6'>
      <h2 className='font-semibold text-xl text-center'>Paid salaries</h2>
      <div className='w-[200px] h-[200px] mx-auto'>
        <Doughnut data={data} options={options} />
      </div>
      <div className='w-full flex justify-between gap-4 xl:px-12'>
        <div className='font-bold text-green-400 text-3xl'>{remainingPercentage}%</div>
        <div className='font-bold text-red-400 text-3xl'>{percentage}%</div>
      </div>
    </div>
  )
}
