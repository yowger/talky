import { createId } from "@paralleldrive/cuid2"

import { NotFoundError } from "@/handler/api-errors"

import { broadcastMessage } from "@/events/chat-events"

import { getUser } from "@/service/user-service"

import type { MessagePayload } from "@/events/chat-events"
import type { RequireAuthProp } from "@clerk/clerk-sdk-node"
import type { Request, Response } from "express"

export async function sendMessageHandler(
    req: RequireAuthProp<Request>,
    res: Response
) {
    const { auth } = req
    const { content, timestamp } = req.body

    const user = await getUser(auth.userId)

    if (!user) {
        throw new NotFoundError("User not found")
    }

    const { id, username, imageUrl } = user

    const message: MessagePayload = {
        id: createId(),
        sender: { id, username, imageUrl },
        content,
        timestamp,
    }

    broadcastMessage(message)

    return res.status(200).send({})
}
