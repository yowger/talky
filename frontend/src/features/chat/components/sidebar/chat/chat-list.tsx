import { formatDistanceToNowStrict } from "date-fns"

import AvatarWithStatus from "@/components/common/avatar-with-status"

import type { Chat } from "../../../types"

interface ChatListProps {
    chats: Chat[]
}

export default function ChatList(props: ChatListProps) {
    const { chats } = props

    return (
        <div className="">
            {chats.map((chat) => {
                const formattedTimestamp = formatChatTimestamp(
                    chat.lastMessage.createdAt
                )

                return (
                    <div
                        key={chat._id}
                        className="flex items-start p-2 cursor-pointer hover:bg-gray-100"
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
                                    {chat.participants
                                        .map((p) => p.username)
                                        .join(", ")}
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
                                />
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

interface ParticipantsAvatarsProps {
    participants: Chat["participants"]
    maxDisplay?: number
}

function ParticipantsAvatars(props: ParticipantsAvatarsProps) {
    const { participants, maxDisplay = 3 } = props

    const displayedParticipants = participants.slice(0, maxDisplay)
    const remainingCount = participants.length - maxDisplay

    return (
        <div className="mt-1 flex -space-x-1 rtl:space-x-reverse">
            {displayedParticipants.map((displayedParticipant) => (
                <AvatarWithStatus
                    key={displayedParticipant.clerkId}
                    src={displayedParticipant.imageUrl}
                    name={displayedParticipant.username}
                    className="h-6 w-6"
                />
            ))}

            {remainingCount > 0 && (
                <div className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded-full z-10 bg-white">
                    <span className="text-gray-500 text-[11px]">
                        +{remainingCount}
                    </span>
                </div>
            )}
        </div>
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
