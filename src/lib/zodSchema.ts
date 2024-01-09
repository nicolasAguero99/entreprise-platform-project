import { z } from 'zod'

export const memberSchema = z.object({
  name: z.string(),
  email: z.string().email()
})
