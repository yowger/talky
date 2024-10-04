import { Router } from "express"

import clerkClient from "@/config/clerk"

import asyncHandler from "@/middlewares/async-handler"

import { sendMessageHandler } from "@/controllers/chat-controller"

const router = Router()

router.post(
    "/messages",
    clerkClient.expressRequireAuth(),
    asyncHandler(sendMessageHandler)
)

export default router
