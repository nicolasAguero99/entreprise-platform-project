import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

// Lib
import { prisma } from '@/lib/prisma'

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
      acc[month] = [Number(acc[month]) + curr.amount]
      // acc[month].push(curr.amount)
      return acc
    }, {})

  return NextResponse.json(allDataReduced)
}
