import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

// Lib
import { prisma } from '@/lib/prisma'

// Constants
import { MONTHS } from '@/constants/constants'

export async function GET (): Promise<NextResponse> {
  const dataBalance = await prisma.balance.findMany({
    select: { amount: true, date: true }
  })
  const rawQueryInvestors = Prisma.sql`SELECT amount, investedIn AS date FROM investorsHistory`
  const dataInvestorsHistory: Array<{ amount: number, date: string }> = await prisma.$queryRaw(rawQueryInvestors)
  const rawQueryMembers = Prisma.sql`SELECT salary AS amount FROM members`
  const dataMembers: Array<{ amount: number }> = await prisma.$queryRaw(rawQueryMembers)
  const allData = [...dataBalance, ...dataInvestorsHistory, ...dataMembers]
  const allDataReduced = allData
    .filter(entry => new Date(entry.date).getUTCFullYear() === 2023)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc, curr) => {
      const date = new Date(curr.date)
      const month = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}`
      acc[month] = acc[month] || []
      acc[month] = Number(acc[month]) + curr.amount
      return acc
    }, {})
  const allDataFilled = MONTHS.slice(1, MONTHS.length).map(month => {
    const monthFormated = String(month.value).padStart(2, '0')
    const isExist = Object.keys(allDataReduced).find(item => item.split('-')[1] === monthFormated)
    return !isExist ? { [`2023-${monthFormated}`]: 0 } : { [isExist]: allDataReduced[isExist] }
  })
  const allAmount = allDataFilled.map(item => Object.values(item)[0])

  return NextResponse.json(allAmount)
}
