'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Services

export default function ChartBalance ({ balance }: { balance: Array<{ amount: number }> }): JSX.Element {
  console.log('balance', balance)

  ChartJS.register(ArcElement, Tooltip, Legend)

  const { incomes, expenses } = balance.reduce(
    (accumulator, { amount }) => {
      return {
        incomes: amount > 0 ? accumulator.incomes + amount : accumulator.incomes,
        expenses: amount < 0 ? accumulator.expenses + amount : accumulator.expenses
      }
    },
    { incomes: 0, expenses: 0 }
  )

  const data = {
    labels: [
      'Incomes',
      'Expenses'
    ],
    datasets: [{
      label: 'Member salary status',
      data: [incomes, expenses],
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
