export interface User {
    name: string
    avatar?: string
}

export interface Message {
    id: string
    content: string
    sender: User
    timestamp: Date
}
