import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'

export async function GET (): Promise<NextResponse> {
  const paidMembers = await prisma.members.findMany({
    select: {
      paid: true
    }
  })
  return NextResponse.json(paidMembers)
}
