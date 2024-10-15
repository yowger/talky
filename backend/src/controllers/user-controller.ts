import { findUsersWithPagination } from "@/service/user-service"

import type { Request, Response } from "express"
import type { UsersQuery } from "@/validation/user/user-schema"

type ExtendedRequest = Request<{}, {}, {}, UsersQuery>

export async function getUsersByPaginationHandler(
    req: ExtendedRequest,
    res: Response
) {
    const { username, page, pageSize } = req.query

    const searchFilter = username ? { username } : {}

    const { users, pagination } = await findUsersWithPagination(searchFilter, {
        page,
        pageSize,
    })

    return res.status(200).json({
        users,
        pagination,
    })
}

// might cached with redis in future probably.. ?
