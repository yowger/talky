import {
    format,
    formatDistanceToNow,
    isToday,
    isThisWeek,
    isThisYear,
} from "date-fns"

import { cn } from "@/lib/utils"

import AvatarWithStatus from "@/components/common/avatar-with-status"

import type { Message } from "../../types"

interface MessageBubbleProps {
    message: Message
    currentUserId: string
}

export default function MessageBubble(props: MessageBubbleProps) {
    const { message, currentUserId } = props

    const formattedTimestamp = formatMessageTimestamp(message.timestamp)
    const isCurrentUser = currentUserId === message.sender.id

    return (
        <div
            className={cn(
                "flex items-start gap-2.5",
                isCurrentUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "flex gap-1  max-w-[56ch]",
                    isCurrentUser && "flex-row-reverse"
                )}
            >
                <AvatarWithStatus
                    src={message.sender.avatar}
                    name={message.sender.name}
                />
                <div className="flex flex-col gap-1 w-full">
                    <MessageContent
                        isCurrentUser={isCurrentUser}
                        content={message.content}
                    />
                    <MessageHeader
                        isCurrentUser={isCurrentUser}
                        senderName={message.sender.name}
                        date={formattedTimestamp}
                    />
                </div>
            </div>
        </div>
    )
}

interface MessageHeaderProps {
    isCurrentUser: boolean
    senderName: string
    date: string
}

function MessageHeader({
    isCurrentUser,
    senderName,
    date,
}: MessageHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-2",
                isCurrentUser ? "flex-row-reverse" : ""
            )}
        >
            <span className="text-xs text-gray-500 dark:text-white">
                {senderName}
            </span>
            <span className="text-sm text-gray-500 dark:text-white">•</span>
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                {date}
            </span>
        </div>
    )
}

interface MessageContentProps {
    isCurrentUser: boolean
    content: string
}

function MessageContent({ isCurrentUser, content }: MessageContentProps) {
    return (
        <div
            className={cn(
                "flex flex-col leading-1.5 p-4 border-gray-200",
                isCurrentUser
                    ? "rounded-s-xl rounded-ee-xl bg-blue-500"
                    : "rounded-e-xl rounded-es-xl bg-gray-100 dark:bg-gray-700"
            )}
        >
            <p
                className={cn(
                    "text-sm font-normal",
                    isCurrentUser
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                )}
            >
                {content}
            </p>
        </div>
    )
}

function formatMessageTimestamp(date: Date): string {
    if (isToday(date)) {
        return formatDistanceToNow(date, { addSuffix: true })
    }

    if (isThisWeek(date)) {
        return format(date, "EEEE, hh:mm a")
    }

    if (isThisYear(date)) {
        return format(date, "MMM dd, hh:mm a")
    }

    return format(date, "MMM dd yyyy, hh:mm a")
}
