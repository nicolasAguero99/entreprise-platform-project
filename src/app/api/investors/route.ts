import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { investorsSchema } from '@/lib/zodSchema'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.investors.findMany({ include: { investorsHistory: true } })
  return NextResponse.json(data)
}

export async function POST (req: any): Promise<NextResponse<unknown>> {
  const rawData = await req.json()
  try {
    const data = investorsSchema.parse(rawData)
    const { investedIn, amount, ...restData } = data
    const createdInvestor = await prisma.investors.create({ data: { ...restData } })
    await prisma.investorsHistory.create({ data: { investedIn, amount, investorId: createdInvestor.id } })
    revalidatePath('/investors')
    return NextResponse.json(createdInvestor)
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(error)
  }
}
