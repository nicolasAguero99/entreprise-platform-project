'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Types
import { type PositionCount } from '@/types/types'

export default function ChartPositions ({ positions }: { positions: PositionCount[] }): JSX.Element {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const positionsNames = Object.keys(positions)
  const positionsLength = Object.values(positions)

  const data = {
    labels: positionsNames,
    datasets: [{
      label: 'Member salary status',
      data: positionsLength,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)',
        'rgb(75, 192, 192)'
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
