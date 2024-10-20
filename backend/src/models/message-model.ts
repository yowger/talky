import { model, Schema } from "mongoose"

import type { HydratedDocumentFromSchema, InferSchemaType } from "mongoose"

const MessageSchema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
        sender: {
            type: String,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const MessageModel = model("Message", MessageSchema)
export type HydratedMessageModel = HydratedDocumentFromSchema<
    typeof MessageSchema
>
export type MessageModelType = InferSchemaType<typeof MessageSchema>
