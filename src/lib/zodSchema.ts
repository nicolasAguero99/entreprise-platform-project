import { z } from 'zod'

const photoObjectSchema = z.object({
  url: z.string(),
  metadata: z.object({
    size: z.number(),
    type: z.string()
  })
})

export const memberSchema = z.object({
  photo: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  position: z.string(),
  salary: z.number().int(),
  paid: z.boolean().optional()
})
