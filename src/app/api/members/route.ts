import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.members.findMany()
  return NextResponse.json(data)
}

export async function POST (req: any): Promise<NextResponse> {
  const data = await req.json()
  const createdMember = await prisma.members.create({ data })
  revalidatePath('/members')
  return NextResponse.json(createdMember)
}

// export async function DELETE (req: any, { params }): Promise<NextResponse> {
//   console.log('params xxxxxx')
//   console.log('params', params)

//   // const { id } = await req.json()
//   // const deletedMember = await prisma.members.delete({ where: { id } })
//   return NextResponse.json(params)
// }
