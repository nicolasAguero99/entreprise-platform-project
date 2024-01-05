import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.members.findMany()
  return NextResponse.json(data)
}

export async function POST (req: any): Promise<NextResponse> {
  const data = await req.json()
  const createdMember = await prisma.members.create({ data })
  return NextResponse.json(createdMember)
}
