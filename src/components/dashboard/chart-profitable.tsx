'use client'

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js'

// Constants
import { COLORS_CHART, MONTHS } from '@/constants/constants'

export default function ChartProfitable ({ profitable }: { profitable: number[] }): JSX.Element {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        data: profitable,
        borderColor: COLORS_CHART[1],
        backgroundColor: COLORS_CHART[0]
      }
    ]
  }

  const options: any = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Profitability by month',
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
    <div className='max-sm:hidden w-full h-[280px] flex flex-col items-center gap-2 bg-white p-4 rounded-lg shadow-md'>
      <Bar style={{ width: '100px', height: '100px' }} data={data} options={options} />
    </div>
  )
}
