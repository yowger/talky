import { UserButton, useUser } from "@clerk/clerk-react"

export default function ChatPage() {
    const { user } = useUser()

    return (
        <div>
            <UserButton />
            chatPage
        </div>
    )
}
