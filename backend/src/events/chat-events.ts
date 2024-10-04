import pusher from "@/config/pusher"

// todo make global user type

interface User {
    id: string
    username: string
    imageUrl: string
}

export interface MessagePayload {
    id: string
    content: string
    sender: User
    timestamp: Date
}

export function broadcastMessage(payload: MessagePayload) {
    pusher.trigger("chat", "new-message", payload)
}
