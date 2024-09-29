// import { useState } from "react"

import MessageInput from "../components/message-input"
import ChatHeader from "../components/chat-header"
import ChatSidebar from "../components/chat-sidebar"
import MessageList from "../components/message-list"
import { Message } from "../types"
import { useEffect, useState } from "react"
import pusher from "@/config/pusher"

export default function ChatPage() {
    const [inputValue, setInputValue] = useState("")
    // const [isSidebarOpen, setSidebarOpen] = useState(false)

    // const toggleSidebar = () => {
    //     setSidebarOpen((prevState) => !prevState)
    // }

    function handleOnChangeInput(input: string) {
        setInputValue(input)
    }

    function handleSendMessage() {
        console.log("🚀 ~ handleSendMessage ~ inputValue:", inputValue)
    }

    useEffect(() => {
        const channel = pusher.subscribe("chat")

        channel.bind("new-message", (data: string) => {
            console.log("🚀 ~ channel.bind ~ data:", data)
        })

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [])

    return (
        <div className="w-full flex h-svh max-h-svh">
            <div className="hidden h-full md:flex-[0.4] lg:flex-[0.3] md:block border-r bg-white">
                <ChatSidebar />
            </div>

            <div className="flex h-full flex-1 flex-col">
                <div className="flex h-full flex-col justify-between overflow-y-auto">
                    <div className="sticky top-0 w-full border-b bg-white z-10">
                        <ChatHeader />
                    </div>

                    <div className="p-4 flex-1">
                        <MessageList messages={messages} />
                    </div>

                    <div className="w-full sticky bottom-0 border-t bg-white z-10">
                        <MessageInput
                            onChange={handleOnChangeInput}
                            onSendClick={handleSendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const messages: Message[] = [
    {
        id: "1",
        content: "Hey!",
        sender: {
            id: "1",
            name: "Alice",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        timestamp: new Date("2023-09-24T14:12:00"),
    },
    {
        id: "2",
        content: "How's everything going? 😊",
        sender: {
            id: "2",
            name: "Bob",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        timestamp: new Date("2023-09-24T14:15:00"),
    },
    {
        id: "3",
        content:
            "I just finished that project we were discussing. It took longer than expected, but I'm happy with the results.",
        sender: {
            id: "3",
            name: "Charlie",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        timestamp: new Date("2023-09-24T14:20:00"),
    },
    {
        id: "4",
        content: "Sounds great! We should review it together later.",
        sender: {
            id: "1",
            name: "Alice",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        timestamp: new Date("2023-09-24T14:25:00"),
    },
    {
        id: "5",
        content: "Sure, I'm free after 5 PM.",
        sender: {
            id: "2",
            name: "Bob",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        timestamp: new Date("2023-09-24T14:28:00"),
    },
    {
        id: "6",
        content:
            "Here's the document you requested earlier. Let me know if you need any changes.",
        sender: {
            id: "3",
            name: "Charlie",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        timestamp: new Date("2023-09-23T10:05:00"),
    },
    {
        id: "7",
        content: "Thanks, I'll check it out and get back to you soon.",
        sender: {
            id: "1",
            name: "Alice",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        timestamp: new Date("2023-09-23T10:15:00"),
    },
    {
        id: "8",
        content: "By the way, did you see the latest news? It's wild!",
        sender: {
            id: "2",
            name: "Bob",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        timestamp: new Date("2023-09-22T16:45:00"),
    },
    {
        id: "9",
        content: "No, what happened?",
        sender: {
            id: "3",
            name: "Charlie",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        timestamp: new Date("2023-09-22T16:50:00"),
    },
    {
        id: "10",
        content:
            "There was a huge announcement from the company. They're launching a new product next month.",
        sender: {
            id: "2",
            name: "Bob",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        timestamp: new Date("2023-09-22T16:55:00"),
    },
    {
        id: "11",
        content: "Nice, I've been waiting for that!",
        sender: {
            id: "1",
            name: "Alice",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        timestamp: new Date("2023-09-22T17:00:00"),
    },
    {
        id: "12",
        content:
            "Check out this link: https://www.example.com. It's got some great info about the product.",
        sender: {
            id: "3",
            name: "Charlie",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        timestamp: new Date("2023-09-21T14:32:00"),
    },
    {
        id: "13",
        content: "Thanks, Charlie! This will be super helpful.",
        sender: {
            id: "2",
            name: "Bob",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        timestamp: new Date("2023-09-21T15:00:00"),
    },
    {
        id: "14",
        content: "Anyone up for a coffee later?",
        sender: {
            id: "1",
            name: "Alice",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        timestamp: new Date("2023-09-20T09:10:00"),
    },
    {
        id: "15",
        content: "I'm in, what time are you thinking?",
        sender: {
            id: "2",
            name: "Bob",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        timestamp: new Date(),
    },
]
