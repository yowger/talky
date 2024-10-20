import { createId } from "@paralleldrive/cuid2"
import { startSession } from "mongoose"

import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
} from "@/handler/api-errors"

import { broadcastMessage } from "@/events/chat-events"

import { createInitialMessage } from "@/service/message-service"
import { getClerkUser } from "@/service/clerk-service"
import { findOrCreateChat, validateParticipants } from "@/service/chat-service"

import type { CreateChat } from "@/validation/chat/create-chat-schema"
import type { MessagePayload } from "@/events/chat-events"
import type { RequireAuthProp } from "@clerk/clerk-sdk-node"
import type { Request, Response } from "express"

type ExtendedRequireAuhProp = RequireAuthProp<Request<{}, {}, CreateChat, {}>>

export async function createOrFindChatHandler(
    req: ExtendedRequireAuhProp,
    res: Response
) {
    const { auth } = req
    const { participants, initialMessage } = req.body

    const session = await startSession()
    session.startTransaction()

    try {
        if (!participants.includes(auth.userId)) {
            participants.push(auth.userId)
        }

        const isValidated = await validateParticipants(participants)
        if (!isValidated) {
            throw new BadRequestError("Some participants do not exist.")
        }

        const chatInstance = await findOrCreateChat(participants)

        if (chatInstance.isNew) {
            await chatInstance.save({ session })

            if (initialMessage) {
                const messageInstance = await createInitialMessage({
                    chatId: chatInstance._id,
                    content: initialMessage,
                    sender: auth.userId,
                })
                await messageInstance.save({ session })

                chatInstance.lastMessage = messageInstance._id
                await chatInstance.save({ session })
            }
        }

        await session.commitTransaction()

        return res.status(201).json(chatInstance)
    } catch (error) {
        await session.abortTransaction()

        throw new InternalServerError("Failed to create conversation", {
            error: {
                message: error.message,
            },
        })
    } finally {
        session.endSession()
    }
}

export async function sendMessageHandler(
    req: RequireAuthProp<Request>,
    res: Response
) {
    const { auth } = req
    const { content, timestamp } = req.body

    const user = await getClerkUser(auth.userId)

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
