import { ChatModel } from "@/models/chat-model"

import { findUsers } from "./user-service"

import type { FilterQuery } from "mongoose"
import type { ChatModelType, HydratedChatModel } from "@/models/chat-model"
import { UserModelType } from "@/models/user-model"

export async function findOrCreateChatInstance(
    participants: UserModelType["clerkId"][]
): Promise<HydratedChatModel> {
    const existingChat = await ChatModel.findOne({
        participants: { $all: participants },
    })

    if (existingChat) {
        return existingChat
    }

    return new ChatModel({
        participants,
    })
}

interface GetChatsByCursorOptions {
    lastId?: string
    limit?: number
}

export async function getChatsByCursor(
    clerkId: UserModelType["clerkId"],
    options?: GetChatsByCursorOptions
) {
    const { lastId, limit = 10 } = options

    const query: FilterQuery<ChatModelType> = {
        participants: { $in: [clerkId] },
    }

    if (lastId) {
        query._id = { $gt: lastId }
    }

    const chats = await ChatModel.find(query)
        .sort({ _id: 1 })
        .limit(limit)
        .populate(populateChatDetails())
        .lean()
        .exec()

    const newCursor = chats.length > 0 ? chats[chats.length - 1]._id : null

    return {
        chats,
        cursor: newCursor,
        hasMore: chats.length === limit,
    }
}

export function populateChatDetails() {
    return [
        {
            path: "participants",
            model: "User",
            localField: "participants",
            foreignField: "clerkId",
            select: { _id: 1, clerkId: 1, username: 1, imageUrl: 1 },
        },
        {
            path: "lastMessage",
            select: {
                _id: 1,
                content: 1,
                sender: 1,
                createdAt: 1,
                updatedAt: 1,
            },
            populate: {
                path: "sender",
                model: "User",
                localField: "clerkId",
                foreignField: "clerkId",
                select: {
                    _id: 1,
                    clerkId: 1,
                    username: 1,
                    imageUrl: 1,
                },
            },
        },
    ]
}

export async function validateParticipants(
    participants: string[]
): Promise<boolean> {
    const users = await findUsers({
        clerkId: { $in: participants },
    })

    if (users.length === participants.length) {
        return true
    }

    return false
}
