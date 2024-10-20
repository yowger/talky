import { Router } from "express"

import clerkClient from "@/config/clerk"

import { createChatSchema } from "@/validation/chat/create-chat-schema"

import asyncHandler from "@/middlewares/async-handler"
import validateRequest from "@/middlewares/validate-request-handler"

import { findOrCreateChatHandler } from "@/controllers/chat-controller"

const router = Router()

router.post(
    "/",
    clerkClient.expressRequireAuth(),
    validateRequest({
        body: createChatSchema,
    }),
    asyncHandler(findOrCreateChatHandler)
)

export default router
