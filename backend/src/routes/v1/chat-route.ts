import { Router } from "express"

import { sendMessageHandler } from "@/controllers/chat-controller"

const router = Router()

router.post("/messages", sendMessageHandler)

export default router
