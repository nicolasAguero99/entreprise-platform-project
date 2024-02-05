import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'

export async function GET (req: any, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params
  const data = await prisma.balance.findUnique({ where: { id: Number(id) } })
  return NextResponse.json(data)
}

export async function PUT (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  try {
    const data = await req.json()
    const updatedBalance = await prisma.balance.update({ where: { id: Number(id) }, data })
    return NextResponse.json(updatedBalance)
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  const deletedBalance = await prisma.balance.delete({ where: { id: Number(id) } })
  return NextResponse.json(deletedBalance)
}
