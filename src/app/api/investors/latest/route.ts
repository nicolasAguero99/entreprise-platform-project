import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.investorsHistory.findFirst({
    orderBy: { investedIn: 'desc' },
    select: { amount: true }
  }).then(res => res?.amount.toLocaleString('en-US'))

  return NextResponse.json(data)
}
