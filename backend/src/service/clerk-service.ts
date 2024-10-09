import clerkClient from "@/config/clerk"

import type { PaginationOptions } from "@/types/pagination-types"
import type { User } from "@clerk/clerk-sdk-node"

export async function getClerkUser(userId: string): Promise<User> {
    return await clerkClient.users.getUser(userId)
}

export async function getClerkUsers(
    username?: string[],
    paginationOptions?: PaginationOptions
) {
    const { page, pageSize } = paginationOptions

    const limit = pageSize
    const offset = (page - 1) * pageSize

    const { data, totalCount } = await clerkClient.users.getUserList({
        username,
        limit,
        offset,
    })

    return { users: data, totalCount }
}
