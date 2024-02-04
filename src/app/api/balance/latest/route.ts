import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.balance.findFirst({
    orderBy: { date: 'desc' },
    select: { amount: true }
  }).then(res => res?.amount)

  return NextResponse.json(data)
}
