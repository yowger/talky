export enum UserStatus {
    ONLINE = "online",
    OFFLINE = "offline",
}

export interface User {
    clerkId: string
    username: string
    imageUrl: string
    status: UserStatus
}
