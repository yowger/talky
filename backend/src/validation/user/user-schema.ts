import { z } from "zod"

import { paginationSchema } from "../common/pagination-schema"

export const usersQuerySchema = paginationSchema.extend({
    username: z.array(z.string()).optional().default([]),
})

export function validateUsersQuery(query: any) {
    return usersQuerySchema.parse(query)
}
