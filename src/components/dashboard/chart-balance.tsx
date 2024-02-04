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

  const percentage = Math.abs(expenses) < incomes
    ? ((Math.abs(expenses) / incomes) * 100).toFixed(0)
    : ((incomes / Math.abs(expenses)) * 100).toFixed(0)

  const remainingPercentage = 100 - Number(percentage)

  const data = {
    labels: [
      'Incomes',
      'Expenses'
    ],
    datasets: [{
      label: 'Amount of balance',
      data: [incomes, expenses],
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
    <div className='relative z-10 flex flex-col gap-6 w-full h-full py-10 px-6'>
      <h2 className='font-semibold text-xl text-center'>Percentage of balance</h2>
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
