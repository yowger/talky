import { ChatModel } from "@/models/chat-model"

import { findUsers } from "./user-service"

import type { HydratedChatModel } from "@/models/chat-model"

export async function findOrCreateChat(
    participants: string[]
): Promise<HydratedChatModel> {
    const existingChat = await ChatModel.findOne({
        participants: { $all: participants },
    })

    if (existingChat) {
        return existingChat
    }

    const newChat = new ChatModel({
        participants,
    })

    return newChat
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
