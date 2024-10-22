import { useQuery } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { AxiosInstance } from "axios"
import type { Chat } from "../types"

export interface GetChatsByCursorResponse {
    chats: Chat[]
    cursor: string
    hasMore: boolean
}

export function getChatsByCursor(
    axiosClient: AxiosInstance,
    cursor?: string
): Promise<GetChatsByCursorResponse> {
    return axiosClient.get("/chat", {
        params: { cursor },
    })
}

export function useGetChatsByCursor(cursor?: string) {
    const axiosAuth = useAxiosAuth()
    console.log("RENDER RENDER")
    return useQuery({   
        queryKey: ["chats", cursor],
        queryFn: () => {
            return getChatsByCursor(axiosAuth, cursor)
        },
    })
}
