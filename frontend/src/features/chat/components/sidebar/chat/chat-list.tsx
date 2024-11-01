import { formatDistanceToNowStrict } from "date-fns"

import { cn } from "@/lib/utils"

import useChatStore from "@/features/chat/stores/slices"

import { formatNames } from "@/features/chat/utils"

import AvatarWithStatus from "@/components/common/avatar-with-status"
import ParticipantsAvatars from "../../chat-body/participants-avatars"

import type { Chat } from "../../../types"

interface ChatListProps {
    chats: Chat[]
}

export default function ChatList(props: ChatListProps) {
    const { chats } = props

    const { activeChatId, setActiveChat } = useChatStore()

    function handleChatStateChange(chat: Chat) {
        setActiveChat(chat._id, chat.participants)
    }

    return (
        <ul>
            {chats.map((chat) => {
                const formattedTimestamp = formatChatTimestamp(
                    chat.lastMessage.createdAt
                )

                {
                    chat.participants.map((p) => p.username).join(", ")
                }

                const participantNames = chat.participants.map(
                    (participant) => participant.username
                )
                const chatName = formatNames(participantNames, 2)

                return (
                    <li
                        key={chat._id}
                        className={cn(
                            "flex items-start p-2 cursor-pointer",
                            activeChatId === chat._id
                                ? "bg-gray-200"
                                : "hover:bg-gray-100"
                        )}
                        onClick={() => handleChatStateChange(chat)}
                    >
                        {chat.lastMessage.sender && (
                            <AvatarWithStatus
                                src={chat.lastMessage.sender.imageUrl}
                                name={chat.lastMessage.sender.username}
                            />
                        )}
                        <div className="flex flex-col w-full ml-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {chatName}
                                </span>
                            </div>
                            <div className="flex justify-between overflow-hidden gap-2">
                                <p className=" text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                    <span className="font-medium">
                                        {chat.lastMessage.sender.username}:{" "}
                                    </span>
                                    {chat.lastMessage.content}
                                </p>

                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formattedTimestamp}
                                </span>
                            </div>

                            {chat.participants.length > 1 && (
                                <ParticipantsAvatars
                                    participants={chat.participants}
                                    maxDisplay={3}
                                    size="small"
                                />
                            )}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

function formatChatTimestamp(date: Date): string {
    const result = formatDistanceToNowStrict(date, { addSuffix: false })

    return result
        .replace(" minute", "m")
        .replace(" minutes", "m")
        .replace(" hour", "h")
        .replace(" hours", "h")
        .replace(" day", "d")
        .replace(" days", "d")
        .replace(" month", "mo")
        .replace(" months", "mo")
        .replace(" year", "y")
        .replace(" years", "y")
}

// todo chat logic for group and single members
