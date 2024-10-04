import { Router } from "express"

import { sendMessageHandler } from "@/controllers/chat-controller"
import asyncHandler from "@/middlewares/async-handler"

const router = Router()

router.post("/messages", asyncHandler(sendMessageHandler))

export default router
