import { useMutation } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { AxiosInstance } from "axios"

interface FindOrCreateChatPayload {
    participants: string[]
    initialMessage?: string
}

export function findOrCreateChat(
    axiosClient: AxiosInstance,
    payload: FindOrCreateChatPayload
) {
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
