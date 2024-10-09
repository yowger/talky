import { z } from "zod"

import { paginationSchema } from "../common/pagination-schema"

export const usersQuerySchema = paginationSchema.extend({
    username: z.string().optional().default(""),
})

export type UsersQuery = z.infer<typeof usersQuerySchema>
