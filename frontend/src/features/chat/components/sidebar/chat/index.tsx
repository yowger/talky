import { Pen } from "lucide-react"

import useChatStore from "@/features/chat/stores/slices"

import { Button } from "@/components/ui/button"
import ChatList from "./chat-list"
import SidebarBody from "../sidebar-body"
import SidebarHeader from "../sidebar-header"
import SidebarTitle from "../sidebar-title"

import type { Chat } from "../../../types"

export default function ChatListDisplay() {
    const { setIsNewChat } = useChatStore()

    function handleNewChat() {
        setIsNewChat(true)
    }

    return (
        <SidebarBody>
            <SidebarHeader>
                <div className="flex flex-1 items-center justify-between">
                    <SidebarTitle>Messages</SidebarTitle>

                    <Button
                        onClick={handleNewChat}
                        size="icon"
                        className="rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300"
                    >
                        <Pen className="h-4 w-4" />
                    </Button>
                </div>
            </SidebarHeader>

            <ChatList chats={chats} />
        </SidebarBody>
    )
}

const chats: Chat[] = [
    {
        id: "1",
        participants: [
            {
                id: "1",
                username: "Alice",
                imageUrl: "https://example.com/alice.jpg",
            },
            { id: "2", username: "Bob", imageUrl: "" },
        ],
        latestMessage: {
            id: "m1",
            content: "Hey there!",
            sender: {
                id: "1",
                username: "Alice",
                imageUrl: "https://example.com/alice.jpg",
            },
            timestamp: new Date(),
        },
    },
    {
        id: "2",
        participants: [{ id: "1", username: "Roger", imageUrl: "" }],
        latestMessage: {
            id: "m2",
            content: "See you tomorrow!",
            sender: { id: "1", username: "Roger", imageUrl: "" },
            timestamp: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
        },
    },
]
