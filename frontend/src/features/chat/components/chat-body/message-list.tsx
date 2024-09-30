import MessageBubble from "./message-bubble"

import type { Message } from "../../types"

interface MessageListProps {
    messages: Message[]
}

export default function MessageList(props: MessageListProps) {
    const { messages } = props

    const userId = "2"

    return (
        <div className="p-4 flex flex-1 flex-col gap-6">
            {messages.map((message, index) => (
                <MessageBubble
                    key={index}
                    message={message}
                    currentUserId={userId}
                />
            ))}
        </div>
    )
}
