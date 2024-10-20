import { MessageModel } from "@/models/message-model"

import type {
    HydratedMessageModel,
    MessageModelType,
} from "@/models/message-model"

type CreateInitialMessage = Omit<MessageModelType, "createdAt" | "updatedAt">

export async function createInitialMessage(
    messageData: CreateInitialMessage
): Promise<HydratedMessageModel> {
    return new MessageModel(messageData)
}
