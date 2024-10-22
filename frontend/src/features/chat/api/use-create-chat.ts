import { useMutation } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { AxiosInstance } from "axios"
import type { MongoId, Timestamp, User } from "../types"

export interface FindOrCreateChatPayload {
    participants: MongoId["_id"][]
    initialMessage?: string
}

export type PartialUser = Pick<
    User,
    "_id" | "clerkId" | "username" | "imageUrl"
>

export interface Message {
    content: string
    sender: PartialUser
}

export interface FindOrCreateChatResponse extends MongoId, Timestamp {
    participants: PartialUser[]
    lastMessage: Message
}

export function findOrCreateChat(
    axiosClient: AxiosInstance,
    payload: FindOrCreateChatPayload
): Promise<FindOrCreateChatResponse> {
    return axiosClient.post("/chat", payload)
}

export function useFindOrCreateChat() {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationFn: (payload: FindOrCreateChatPayload) => {
            return findOrCreateChat(axiosAuth, payload)
        },
    })
}
