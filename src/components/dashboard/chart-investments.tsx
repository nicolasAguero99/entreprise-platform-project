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

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Investments by month',
        color: 'black',
        font: {
          size: 22,
          weight: 'bold',
          family: 'Inter'
        }
      },
      legend: {
        display: false
      }
    }
  }

  return (
    <div className='w-full h-[280px] flex flex-col items-center gap-2 bg-white p-4 rounded-lg shadow-md'>
      <Line style={{ width: '100px', height: '100px' }} data={data} options={options} />
    </div>
  )
}
