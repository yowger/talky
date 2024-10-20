import { Router } from "express"

import clerkClient from "@/config/clerk"

import { usersQuerySchema } from "@/validation/user/user-schema"

import asyncHandler from "@/middlewares/async-handler"
import validateRequest from "@/middlewares/validate-request-handler"

import { sendMessageHandler } from "@/controllers/chat-controller"

const router = Router()

router.post(
    "/",
    clerkClient.expressRequireAuth(),
    validateRequest({
        query: usersQuerySchema,
    }),
    asyncHandler(sendMessageHandler)
)

export default router
