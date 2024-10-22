// todo - common to move
export type Status = "online" | "offline"

export interface MongoId {
    _id: string
}

export interface Timestamp {
    createdAt: Date
    updatedAt: Date
}

export interface Pagination {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
}

export interface User extends MongoId, Timestamp {
    clerkId: string
    username: string
    imageUrl: string
    status: Status
}

export interface Message extends MongoId, Timestamp {
    content: string
    sender: User
    timestamp: Date
}

export type PartialUser = Pick<
    User,
    "_id" | "clerkId" | "username" | "imageUrl"
>

export interface Chat extends MongoId, Timestamp {
    participants: PartialUser[]
    lastMessage: Message
}
