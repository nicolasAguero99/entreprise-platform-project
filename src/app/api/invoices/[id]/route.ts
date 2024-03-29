import { NextResponse } from 'next/server'
// import { revalidatePath } from 'next/cache'

// Lib
import { prisma } from '@/lib/prisma'

export async function GET (req: any, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params
  const data = await prisma.members.findUnique({ where: { id: Number(id) } })
  return NextResponse.json(data)
}

export async function PUT (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  try {
    const data = await req.json()
    const updatedMember = await prisma.members.update({ where: { id: Number(id) }, data })
    return NextResponse.json(updatedMember)
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  const deletedMember = await prisma.members.delete({ where: { id: Number(id) } })
  return NextResponse.json(deletedMember)
}
