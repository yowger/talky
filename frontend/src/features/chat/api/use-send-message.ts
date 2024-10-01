import { useMutation } from "@tanstack/react-query"

import axiosClient from "@/config/axios"

export function sendMessage(message: string) {
    return axiosClient.post("/chat/messages", { message })
}

export function useSendMessage() {
    return useMutation({
        onSuccess: (data) => {
            console.log("🚀 ~ useLogin ~ data:", data)
        },
        mutationFn: sendMessage,
    })
}
