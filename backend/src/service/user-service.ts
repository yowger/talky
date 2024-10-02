import clerkClient from "@/config/clerk"

import type { PaginationOptions } from "@/types/pagination-types"

export async function getUsers(
    username?: string[],
    paginationOptions?: PaginationOptions
) {
    const { data, totalCount } = await clerkClient.users.getUserList({
        username,
        ...paginationOptions,
    })

    return { users: data, totalCount }
}
