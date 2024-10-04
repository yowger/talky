import { useMutation } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { AxiosInstance } from "axios"

interface MessagePayload {
    content: string
    timestamp: Date
}

export function sendMessage(
    axiosClient: AxiosInstance,
    payload: MessagePayload
) {
    return axiosClient.post("/chat/messages", payload)
}
export function useSendMessage() {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationFn: (payload: MessagePayload) => {
            return sendMessage(axiosAuth, payload)
        },
    })
}
