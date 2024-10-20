import { model, Schema } from "mongoose"

import type { HydratedDocumentFromSchema, InferSchemaType } from "mongoose"

const ChatSchema = new Schema(
    {
        name: {
            type: String,
        },
        participants: [
            {
                type: String,
                required: true,
                ref: "User",
            },
        ],
        createdBy: {
            type: String,
        },
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
)

export const ChatModel = model("Chat", ChatSchema)
export type HydratedChatModel = HydratedDocumentFromSchema<typeof ChatSchema>
export type ChatModelType = InferSchemaType<typeof ChatSchema>

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
