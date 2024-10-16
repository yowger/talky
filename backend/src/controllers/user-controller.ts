import {
    findUsersByAutoComplete,
    findUsersByPagination,
} from "@/service/user-service"

import type { Request, Response } from "express"
import type { UsersQuery } from "@/validation/user/user-schema"

type ExtendedRequest = Request<{}, {}, {}, UsersQuery>

export async function getUsersByPaginationHandler(
    req: ExtendedRequest,
    res: Response
) {
    const { username, page, pageSize } = req.query

    const { users, pagination } = await findUsersByPagination(username, {
        page,
        pageSize,
    })

    return res.status(200).json({
        users,
        pagination,
    })
}

export async function getUsersByAutoCompleteHandler(
    req: ExtendedRequest,
    res: Response
) {
    const { username } = req.query

    const users = await findUsersByAutoComplete(username)

    return res.status(200).json(users)
}

// might cached with redis in future probably.. ?
