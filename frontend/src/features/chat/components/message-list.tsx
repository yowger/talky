import MessageBubble from "./message-bubble"

import type { Message } from "../types"

interface MessageListProps {
    messages: Message[]
}

export default function MessageList(props: MessageListProps) {
    const { messages } = props

    return (
        <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
            ))}
        </div>
    )
}
