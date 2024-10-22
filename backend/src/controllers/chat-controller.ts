import { startSession } from "mongoose"

import { BadRequestError, InternalServerError } from "@/handler/api-errors"

import { createInitialMessage } from "@/service/message-service"
import {
    findOrCreateChatInstance,
    getChatsByCursor,
    populateChatDetails,
    validateParticipants,
} from "@/service/chat-service"

import type { CreateChat, GetChats } from "@/validation/chat/create-chat-schema"
import type { RequireAuthProp } from "@clerk/clerk-sdk-node"
import type { Request, Response } from "express"

type ExtendedFindOrCreateChatsRequest = RequireAuthProp<
    Request<{}, {}, CreateChat, {}>
>

export async function findOrCreateChatHandler(
    req: ExtendedFindOrCreateChatsRequest,
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

        const chatInstance = await findOrCreateChatInstance(participants)

        if (initialMessage) {
            const messageInstance = await createInitialMessage({
                chatId: chatInstance._id,
                content: initialMessage,
                sender: auth.userId,
            })
            await messageInstance.save({ session })

            chatInstance.lastMessage = messageInstance._id
        }

        await chatInstance.save({ session })

        await chatInstance.populate(populateChatDetails())

        await session.commitTransaction()

        res.status(201).json(chatInstance)
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

type ExtendedGetChatsRequest = RequireAuthProp<Request<{}, {}, {}, GetChats>>

export async function getChatsWithCursorHandler(
    req: ExtendedGetChatsRequest,
    res: Response
) {
    const { auth } = req
    const { cursor } = req.query

    const chats = await getChatsByCursor(auth.userId, { lastId: cursor })

    res.status(201).json(chats)
}
