import { z } from 'zod'

// const photoObjectSchema = z.object({
//   url: z.string(),
//   metadata: z.object({
//     size: z.number(),
//     type: z.string()
//   })
// })

export const memberSchema = z.object({
  photo: z.string(),
  name: z.string(),
  email: z.string().email(),
  position: z.string(),
  salary: z.number().int(),
  paid: z.boolean().optional()
})

export const investorsSchema = z.object({
  photo: z.string(),
  name: z.string(),
  amount: z.number(),
  idHistory: z.number().optional(),
  investedIn: z.string()
  // investorId: z.number().optional()
})

export const investorsHistorySchema = z.object({
  investorId: z.number(),
  // investor: z.string(),
  date: z.date(),
  amount: z.number(),
  investedIn: z.date(),
  createdAt: z.date()
})

export const balanceSchema = z.object({
  action: z.string(),
  amount: z.number(),
  date: z.string()
})
