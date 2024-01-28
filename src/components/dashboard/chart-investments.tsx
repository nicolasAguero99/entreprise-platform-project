'use client'

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// Constants
import { MONTHS } from '@/constants/constants'

export default function ChartInvestments ({ investments }: { investments: number[] }): JSX.Element {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  }

  const labels = MONTHS.slice(1, MONTHS.length).map(({ name }) => name.slice(0, 3))

  const data = {
    labels,
    datasets: [
      {
        label: 'Investments',
        data: investments,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return (
    <div className='w-full h-full'>
      <Line data={data} options={options} />
    </div>
  )
}
