import { validateUsersQuery } from "@/validation/user/user-schema"

import { getClerkUsers } from "@/service/clerk-service"

import type { PaginationOptions } from "@/types/pagination-types"
import type { Request, Response } from "express"

export async function getUsersByPaginationHandler(req: Request, res: Response) {
    const { username, page, pageSize } = validateUsersQuery(req.query)
    console.log("nice")
    const offset = (page - 1) * pageSize

    const paginationOptions: PaginationOptions = {
        limit: pageSize,
        offset,
    }

    const { users, totalCount } = await getClerkUsers(
        username,
        paginationOptions
    )

    const formattedUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
        profileImageUrl: user.imageUrl,
    }))

    const totalPages = Math.ceil(totalCount / pageSize)

    return res.status(200).json({
        users: formattedUsers,
        totalCount,
        pagination: {
            page,
            pageSize,
            totalCount,
            totalPages,
        },
    })
}

// might cached with redis in future probably.. ?
