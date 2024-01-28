'use client'

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js'

// Constants
import { MONTHS } from '@/constants/constants'

export default function ChartProfitable ({ profitable }: { profitable: number[] }): JSX.Element {
  console.log('profitable', profitable)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        data: profitable,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return (
    <div className='w-full h-full'>
      <Bar data={data} options={options} />
    </div>
  )
}
