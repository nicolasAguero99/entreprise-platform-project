import { NextResponse } from 'next/server'

// Lib
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { investorsHistorySchema } from '@/lib/zodSchema'

// import { investorsHistoryObj } from '@/lib/mocks'

export async function GET (): Promise<NextResponse> {
  const data = await prisma.investorsHistory.findMany()
  return NextResponse.json(data)
}

export async function POST (req: any): Promise<NextResponse<unknown>> {
  const rawData = await req.json()
  try {
    const data = investorsHistorySchema.parse(rawData)
    console.log('data', data)
    const createdMember = await prisma.investorsHistory.create({ data })
    revalidatePath('/investors')
    return NextResponse.json(createdMember)
  } catch (error) {
    console.log('error', error)

    return NextResponse.json(error)
  }
}

// export async function POST (req: any): Promise<NextResponse<unknown>> {
//   investorsHistoryObj.map(async (data) => {
//     try {
//       const createdMember = await prisma.investorsHistory.create({ data })
//       return NextResponse.json(createdMember)
//     } catch (error) {
//       console.log('error', error)

//       return NextResponse.json(error)
//     }
//   })
// }

// export async function DELETE (req: any, { params }): Promise<NextResponse> {
//   console.log('params xxxxxx')
//   console.log('params', params)

//   // const { id } = await req.json()
//   // const deletedMember = await prisma.members.delete({ where: { id } })
//   return NextResponse.json(params)
// }
