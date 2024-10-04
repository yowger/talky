import { Router } from "express"

import clerkClient from "@/config/clerk"

import asyncHandler from "@/middlewares/async-handler"

import { getUsersByPaginationHandler } from "@/controllers/user-controller"

const router = Router()

router.get(
    "/",
    clerkClient.expressRequireAuth(),
    asyncHandler(getUsersByPaginationHandler)
)

export default router
