import { useMutation } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { AxiosInstance } from "axios"

export function sendMessage(axiosClient: AxiosInstance, message: string) {
    return axiosClient.post("/chat/messages", { message })
}

export function useSendMessage() {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationFn: (message: string) => {
            return sendMessage(axiosAuth, message)
        },
    })
}
