import { Input } from "@/components/ui/input"
import ChatHeader from "../chat-header"

export default function NewChat() {
    return (
        <div className="flex flex-1 h-full w-full">
            <ChatHeader>
                <div className="flex flex-1 items-center">
                    <span>To:</span>
                    <Input className="ms-2" />
                </div>
            </ChatHeader>
        </div>
    )
}
