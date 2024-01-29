import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Types
import { type PositionCount } from '@/types/types'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.members.findMany({
    select: { position: true }
  })

  const dataReduced: PositionCount = data.reduce((acc: PositionCount, curr) => {
    acc[curr.position] = acc[curr.position] !== undefined ? acc[curr.position] + 1 : 1
    return acc
  }, {})

  return NextResponse.json(dataReduced)
}
