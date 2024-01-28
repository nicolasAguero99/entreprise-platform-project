import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.balance.findMany({
    select: { amount: true }
  })
  return NextResponse.json(data)
}
