import { Request, Response } from "express"

import { broadcastMessage } from "@/events/chat-events"

export function sendMessageHandler(req: Request, res: Response) {
    const { message } = req.body

    broadcastMessage(message)

    res.status(200)
}
