export interface User {
    id: string
    name: string
    avatar?: string
}

export interface Message {
    id: string
    content: string
    sender: User
    timestamp: Date
}

export interface Chat {
    id: string
    participants: User[]
    latestMessage: Message
}
