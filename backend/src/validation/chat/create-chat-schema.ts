import { z } from "zod"

export const createChatSchema = z.object({
    participants: z.array(z.string()),
    initialMessage: z.string().optional(),
})

export type CreateChat = z.infer<typeof createChatSchema>
