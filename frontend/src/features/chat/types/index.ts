export interface User {
    id: number
    username: string
    profileImageUrl: string
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
