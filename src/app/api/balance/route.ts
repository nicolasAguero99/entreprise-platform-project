import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Lib
import { prisma } from '@/lib/prisma'
import { balanceSchema } from '@/lib/zodSchema'
// import { balanceObj } from '@/lib/mocks'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.balance.findMany()
  return NextResponse.json(data)
}

export async function POST (req: any): Promise<NextResponse<unknown>> {
  const rawData = await req.json()
  try {
    const data = balanceSchema.parse(rawData)
    const createdMember = await prisma.balance.create({ data })
    revalidatePath('/balance')
    return NextResponse.json(createdMember)
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(error)
  }
}
