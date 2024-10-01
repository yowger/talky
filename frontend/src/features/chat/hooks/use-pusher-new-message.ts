import { useEffect } from "react"

import pusher from "@/config/pusher"

import type { Message } from "../types"

interface UsePusherNewMessage {
    onNewMessage: (newMessage: Message) => void
}

const usePusherNewMessage = ({ onNewMessage }: UsePusherNewMessage) => {
    useEffect(() => {
        const channel = pusher.subscribe("chat")

        channel.bind("new-message", (newMessage: Message) => {
            onNewMessage(newMessage)
        })

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [onNewMessage])
}

export default usePusherNewMessage
