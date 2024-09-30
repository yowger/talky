import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import ChatList from "./chat-list"
import SidebarBody from "../sidebar-body"
import SidebarHeader from "../sidebar-header"
import SidebarTitle from "../sidebar-title"

import type { Chat } from "../../../types"

export default function ChatListDisplay() {
    return (
        <SidebarBody>
            <SidebarHeader>
                <SidebarTitle>Messages</SidebarTitle>

                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full text-gray-500"
                >
                    <UserPlus className="h-4 w-4" />
                </Button>
            </SidebarHeader>

            <ChatList chats={chats} />
        </SidebarBody>
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
