import { NextResponse } from 'next/server'
// import { revalidatePath } from 'next/cache'

// Lib
import { prisma } from '@/lib/prisma'
import { investorsSchema } from '@/lib/zodSchema'

export async function GET (req: any, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params
  const data = await prisma.investors.findUnique({ where: { id: Number(id) }, include: { investorsHistory: true } })
  return NextResponse.json(data)
}

export async function PUT (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  try {
    const rawData = await req.json()
    const data = investorsSchema.parse(rawData)
    console.log('data', data)
    const updatedInvestor = await prisma.investors.update({ where: { id: Number(id) }, data })
    // const investorHistory = await prisma.investorsHistory.findMany({ investorId: Number(id) })
    return NextResponse.json(updatedInvestor)
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(error)
  }
}

export async function DELETE (req: any, { params }: any): Promise<NextResponse> {
  const { id } = await params
  const deletedInvestor = await prisma.investors.delete({ where: { id: Number(id) } })
  return NextResponse.json(deletedInvestor)
}
