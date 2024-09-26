import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { Chat } from "../types"
import ChatList from "./chat-list"

export default function ChatSidebar() {
    return (
        <div className="h-full">
            <div className="flex items-center justify-between py-2 px-3">
                <h1 className="text-xl font-bold tracking-wide">Messages</h1>

                <Button variant="outline" size="icon" className="rounded-full">
                    <UserPlus className="h-4 w-4" />
                </Button>
            </div>

            <ChatList chats={chats} />
        </div>
    )
}

const chats: Chat[] = [
    {
        id: "1",
        participants: [
            { id: "1", name: "Alice", avatar: "https://example.com/alice.jpg" },
            { id: "2", name: "Bob" },
        ],
        latestMessage: {
            id: "m1",
            content: "Hey there!",
            sender: {
                id: "1",
                name: "Alice",
                avatar: "https://example.com/alice.jpg",
            },
            timestamp: new Date(),
        },
    },
    {
        id: "2",
        participants: [{ id: "1", name: "Roger" }],
        latestMessage: {
            id: "m2",
            content: "See you tomorrow!",
            sender: { id: "1", name: "Roger" },
            timestamp: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
        },
    },
]
