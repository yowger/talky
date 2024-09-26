import { format, formatDistanceToNow, isToday, isThisWeek } from "date-fns"

import { cn } from "@/lib/utils"

import AvatarWithStatus from "@/components/common/avatar-with-status"

import type { Message } from "../types"

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
            {!isCurrentUser && (
                <AvatarWithStatus
                    src={message.sender.avatar}
                    name={message.sender.name}
                />
            )}
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div
                    className={cn(
                        "flex items-center space-x-2 rtl:space-x-reverse",
                        isCurrentUser ? "justify-end" : "justify-start"
                    )}
                >
                    {!isCurrentUser && (
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {message.sender.name}
                        </span>
                    )}
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        {formattedTimestamp}
                    </span>
                </div>
                <div
                    className={cn(
                        "flex flex-col leading-1.5 p-4 border-gray-200",
                        isCurrentUser
                            ? "rounded-s-xl rounded-ee-xl bg-blue-500"
                            : "rounded-e-xl rounded-es-xl bg-gray-100  dark:bg-gray-700"
                    )}
                >
                    <p
                        className={cn(
                            "text-sm font-normal text-gray-900 dark:text-white",
                            isCurrentUser
                                ? "text-white"
                                : "text-gray-900 dark:text-white"
                        )}
                    >
                        {message.content}
                    </p>
                </div>
            </div>
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

    return format(date, "MMM, dd yyyy hh:mm a")
}
