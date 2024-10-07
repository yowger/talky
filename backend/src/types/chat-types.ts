import { Types } from "mongoose"

import type { User } from "@/types/user-types"

type UserId = User["clerkId"]
type ObjectId = Types.ObjectId

export interface Chat {
    name?: string
    participants: UserId[]
    messages: ObjectId[]
    isGroupChat: boolean
    lastMessage?: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface message {
    chatId: ObjectId
    sender: ObjectId
    content?: string
    // attachments?:
    // isRead:
    // reactions:
    createdAt: Date
    updatedAt: Date
}
