'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Services

export default function PieChart ({ statePaids }: { statePaids: Array<{ paid: boolean }> }): JSX.Element {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const { paided, unpaided } = statePaids.reduce(
    (accumulator, { paid }) => ({
      paided: accumulator.paided + Number(paid),
      unpaided: accumulator.unpaided + Number(!paid)
    }),
    { paided: 0, unpaided: 0 }
  )

  const data = {
    labels: [
      'Paid',
      'Unpaid'
    ],
    datasets: [{
      label: 'Member salary status',
      data: [paided, unpaided],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }

  const options: any = {
    color: '#000',
    reponsive: true,
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 10, padding: 15, usePointStyle: true, pointStyleWidth: 20, font: { size: 14, family: 'Montserrat' } } }
    }
  }

  return (
    <div className='w-full h-full'>
      <Doughnut data={data} options={options} />
    </div>
  )
}
