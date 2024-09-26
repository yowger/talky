import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Chat } from "../types"
import { formatDistanceToNow } from "date-fns"

interface ChatListProps {
    chats: Chat[]
}

export default function ChatList(props: ChatListProps) {
    const { chats } = props

    return (
        <div className="space-y-2">
            {chats.map((chat) => {
                const formattedTimestamp = formatChatTimestamp(
                    chat.latestMessage.timestamp
                )

                return (
                    <div
                        key={chat.id}
                        className="flex items-start p-2 border-b border-gray-200 dark:border-gray-700"
                    >
                        <Avatar>
                            {chat.participants.length > 0 && (
                                <>
                                    <AvatarImage
                                        src={
                                            chat.participants[0].avatar ||
                                            "https://github.com/shadcn.png"
                                        }
                                    />
                                    <AvatarFallback>
                                        {chat.participants[0].name
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </>
                            )}
                        </Avatar>
                        <div className="flex flex-col w-full ml-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {chat.participants
                                        .map((p) => p.name)
                                        .join(", ")}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formattedTimestamp}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {chat.latestMessage.content}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function formatChatTimestamp(date: Date): string {
    return formatDistanceToNow(date)
}
