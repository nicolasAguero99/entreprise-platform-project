import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MONTHS } from '@/constants/constants'
import { type AmountByMonth } from '@/types/types'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.investorsHistory.findMany({
    select: { amount: true, investedIn: true }
  })

  const filteredData = data
    .filter(entry => new Date(entry.investedIn).getUTCFullYear() === 2023)
    .reduce((acc, entry) => {
      const date = new Date(entry.investedIn)
      const monthKey = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0')}`

      acc[monthKey] = acc[monthKey] || []
      acc[monthKey].push(entry)

      return acc
    }, {} as Record<string, AmountByMonth[]>)

  const investmentMonths = Object.keys(filteredData).map(month => month.split('-')[1])

  const sumByMonth = Object.entries(filteredData).map(([month, entries]) => ({
    month,
    totalAmount: entries.reduce((sum, entry) => sum + entry.amount, 0)
  }))

  const sumByMonthFilled = MONTHS.slice(1).map(month => {
    const existingItem = sumByMonth.find(
      item => item.month.split('-')[1] === String(month.value).padStart(2, '0')
    )
    return existingItem ?? {
      month: `2023-${String(month.value).padStart(2, '0')}`,
      totalAmount: 0
    }
  })

  const sumByMonthSorted = sumByMonthFilled
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .map(({ totalAmount }) => totalAmount)

  return NextResponse.json(sumByMonthSorted)
}
