import { broadcastMessage } from "@/events/chat-events"

import type { Request, Response } from "express"

export async function sendMessageHandler(req: Request, res: Response) {
    const { message } = req.body

    broadcastMessage(message)

    return res.status(200).json({})
}
