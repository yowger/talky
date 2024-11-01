import ChatSidebar from "../components/sidebar"
import ChatMain from "../components/chat-body"

export default function ChatPage() {
    return (
        <div className="w-full flex h-svh max-h-svh">
            <ChatSidebar />
            <ChatMain />
        </div>
    )
}
