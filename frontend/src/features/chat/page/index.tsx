import ChatSidebar from "../components/sidebar"
import ChatMain from "../components/chat-body"
import Empty from "../components/chat-body/empty"

export default function ChatPage() {
    const chat = true

    return (
        <div className="w-full flex h-svh max-h-svh">
            <ChatSidebar />
            {chat ? <ChatMain /> : <Empty />}
        </div>
    )
}
