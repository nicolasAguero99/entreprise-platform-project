import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'
import { memberSchema } from '@/lib/zodSchema'

export async function GET (req: any, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params
  const data = await prisma.members.findUnique({ where: { id: Number(id) } })
  return NextResponse.json(data)
}

export async function PUT (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  try {
    const rawData = await req.json()
    const data = memberSchema.parse(rawData)
    const updatedMember = await prisma.members.update({ where: { id: Number(id) }, data })
    return NextResponse.json(updatedMember)
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(error)
  }
}

export async function DELETE (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  const deletedMember = await prisma.members.delete({ where: { id: Number(id) } })
  return NextResponse.json(deletedMember)
}
