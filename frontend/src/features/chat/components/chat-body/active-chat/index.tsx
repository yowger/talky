import { useState } from "react"
import { useUser } from "@clerk/clerk-react"

import usePusherNewMessage from "@/features/chat/hooks/use-pusher-new-message"
import useChatStore from "@/features/chat/stores/slices"
import { useSendMessage } from "@/features/chat/api/use-send-message"

import { formatNames } from "@/features/chat/utils"

import ChatHeader from "../chat-header"
import MessageInput from "../messages/message-input"
import MessageList from "../messages/message-list"
import ParticipantsAvatars from "../participants-avatars"

import type { Message } from "@/features/chat/types"

export default function ActiveChat() {
    const { user, isLoaded } = useUser()
    const { participants } = useChatStore()
    const { mutate } = useSendMessage()

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    const participantNames = participants.map(
        (participant) => participant.username
    )
    const chatName = formatNames(participantNames, 2)

    function handleSendMessage() {
        mutate({
            content: newMessage,
            timestamp: new Date(),
        })
    }

    function handleNewMessage(newMessage: Message) {
        console.log("🚀 ~ handleNewMessage ~ newMessage:", newMessage)
        setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    usePusherNewMessage({ onNewMessage: handleNewMessage })

    if (!isLoaded) {
        return "loading"
    }

    // if (messages.length === 0) {
    //     return <p>no messages</p>
    // }

    return (
        <div className="flex flex-1 h-full flex-col justify-between overflow-y-auto">
            <ChatHeader>
                <ParticipantsAvatars
                    participants={participants}
                    maxDisplay={2}
                    size={"medium"}
                />
                <h3 className="font-medium">{chatName}</h3>
            </ChatHeader>
            <MessageList messages={messages} currentUserId={user?.id || ""} />
            <MessageInput
                value={newMessage}
                onSendClick={handleSendMessage}
                onChange={setNewMessage}
            />
        </div>
    )
}

// const fakeMessages: Message[] = [
//     {
//         id: "1",
//         content: "Hey!",
//         sender: {
//             id: "1",
//             username: "Alice",
//             imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//         },
//         timestamp: new Date("2023-09-24T14:12:00"),
//     },
//     {
//         id: "2",
//         content: "How's everything going? 😊",
//         sender: {
//             id: "2",
//             username: "Bob",
//             imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//         },
//         timestamp: new Date("2023-09-24T14:15:00"),
//     },
//     {
//         id: "3",
//         content:
//             "I just finished that project we were discussing. It took longer than expected, but I'm happy with the results.",
//         sender: {
//             id: "3",
//             username: "Charlie",
//             imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
//         },
//         timestamp: new Date("2023-09-24T14:20:00"),
//     },
//     {
//         id: "4",
//         content: "Sounds great! We should review it together later.",
//         sender: {
//             id: "1",
//             username: "Alice",
//             imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//         },
//         timestamp: new Date("2023-09-24T14:25:00"),
//     },
//     {
//         id: "5",
//         content: "Sure, I'm free after 5 PM.",
//         sender: {
//             id: "2",
//             username: "Bob",
//             imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//         },
//         timestamp: new Date("2023-09-24T14:28:00"),
//     },
//     {
//         id: "6",
//         content:
//             "Here's the document you requested earlier. Let me know if you need any changes.",
//         sender: {
//             id: "3",
//             username: "Charlie",
//             imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
//         },
//         timestamp: new Date("2023-09-23T10:05:00"),
//     },
//     {
//         id: "7",
//         content: "Thanks, I'll check it out and get back to you soon.",
//         sender: {
//             id: "1",
//             username: "Alice",
//             imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//         },
//         timestamp: new Date("2023-09-23T10:15:00"),
//     },
//     {
//         id: "8",
//         content: "By the way, did you see the latest news? It's wild!",
//         sender: {
//             id: "2",
//             username: "Bob",
//             imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//         },
//         timestamp: new Date("2023-09-22T16:45:00"),
//     },
//     {
//         id: "9",
//         content: "No, what happened?",
//         sender: {
//             id: "3",
//             username: "Charlie",
//             imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
//         },
//         timestamp: new Date("2023-09-22T16:50:00"),
//     },
//     {
//         id: "10",
//         content:
//             "There was a huge announcement from the company. They're launching a new product next month.",
//         sender: {
//             id: "2",
//             username: "Bob",
//             imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//         },
//         timestamp: new Date("2023-09-22T16:55:00"),
//     },
//     {
//         id: "11",
//         content: "Nice, I've been waiting for that!",
//         sender: {
//             id: "1",
//             username: "Alice",
//             imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//         },
//         timestamp: new Date("2023-09-22T17:00:00"),
//     },
//     {
//         id: "12",
//         content:
//             "Check out this link: https://www.example.com. It's got some great info about the product.",
//         sender: {
//             id: "3",
//             username: "Charlie",
//             imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
//         },
//         timestamp: new Date("2023-09-21T14:32:00"),
//     },
//     {
//         id: "13",
//         content: "Thanks, Charlie! This will be super helpful.",
//         sender: {
//             id: "2",
//             username: "Bob",
//             imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//         },
//         timestamp: new Date("2023-09-21T15:00:00"),
//     },
//     {
//         id: "14",
//         content: "Anyone up for a coffee later?",
//         sender: {
//             id: "1",
//             username: "Alice",
//             imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
//         },
//         timestamp: new Date("2023-09-20T09:10:00"),
//     },
//     {
//         id: "15",
//         content: "I'm in, what time are you thinking?",
//         sender: {
//             id: "2",
//             username: "Bob",
//             imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
//         },
//         timestamp: new Date(),
//     },
// ]
