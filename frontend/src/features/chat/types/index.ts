export type Status = "online" | "offline"

export interface User {
    id: string
    clerkId: string
    username: string
    imageUrl: string
    status: Status
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

export interface Pagination {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
}
