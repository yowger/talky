import ChatSidebar from "../components/sidebar/chat-sidebar"
import ChatMain from "../components/chat-body/chat-main"
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
