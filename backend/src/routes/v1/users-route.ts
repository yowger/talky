import { Router } from "express"

import clerkClient from "@/config/clerk"

import { usersQuerySchema } from "@/validation/user/user-schema"

import asyncHandler from "@/middlewares/async-handler"
import validateRequest from "@/middlewares/validate-request-handler"

import {
    getUsersByPaginationHandler,
    getUsersByAutoCompleteHandler,
} from "@/controllers/user-controller"

const router = Router()

router.get(
    "/",
    clerkClient.expressRequireAuth(),
    asyncHandler(getUsersByPaginationHandler)
)

router.get(
    "/autocomplete",
    clerkClient.expressRequireAuth(),
    validateRequest({
        query: usersQuerySchema,
    }),
    asyncHandler(getUsersByAutoCompleteHandler)
)

export default router

// todo validate middleware
