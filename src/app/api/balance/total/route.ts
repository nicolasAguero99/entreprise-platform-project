import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.balance.findMany({
    select: { amount: true }
  })

  const dataReduced = data.reduce((acc, { amount }) => {
    acc += amount
    return acc
  }, 0)
  const dataFormated = dataReduced

  return NextResponse.json(dataFormated)
}
