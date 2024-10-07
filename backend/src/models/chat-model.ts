/*
    CHAT - 
    id 
    createdAt: date
    updatedAt: date
    lastMessageAt: date
    name?: sting
    isGroup?: boolean

    ?
    messagesIds: string[]
    messages: Messages[]

    MESSAGE - 
    id
    body?: string
    image?: string
    createdAt: date

    seenIds: string[]

    senderId: string
*/

import { Chat } from "@/types/chat-types"
import { Document, Schema } from "mongoose"

type ChatDocument = Chat & Document

const ChatSchema = new Schema<ChatDocument>(
    {
        name: {
            type: String,
        },
        participants: [{
            type: Schema.Types.ObjectId,
        }],
    },
    {
        timestamps: true,
    }
)
