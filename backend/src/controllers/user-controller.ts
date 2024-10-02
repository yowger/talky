import clerkClient from "@/config/clerk"

import { validateUsersQuery } from "@/validation/user/user-schema"

import type { Request, Response } from "express"

export async function getUsersByPaginationHandler(req: Request, res: Response) {
    const { username, page, pageSize } = validateUsersQuery(req.query)

    const offset = (page - 1) * pageSize

    const paginationOptions = {
        limit: pageSize,
        offset,
    }

    const { data, totalCount } = await clerkClient.users.getUserList({
        username,
        ...paginationOptions,
    })

    const totalPages = Math.ceil(totalCount / pageSize)

    return res.status(200).json({
        users: data,
        totalCount,
        pagination: {
            page,
            pageSize,
            totalCount,
            totalPages,
        },
    })
}
