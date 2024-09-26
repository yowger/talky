import { format, formatDistanceToNow, isToday, isThisWeek } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import type { Message } from "../types"

interface MessageBubbleProps {
    message: Message
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

export default function MessageBubble(props: MessageBubbleProps) {
    const { message } = props

    const formattedTimestamp = formatMessageTimestamp(message.timestamp)
    const avatarFallback = message.sender.name.slice(0, 2).toUpperCase()

    return (
        <div className="flex items-start gap-2.5">
            <Avatar>
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {message.sender.name}
                    </span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        {formattedTimestamp}
                    </span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                        {message.content}
                    </p>
                </div>
            </div>
        </div>
    )
}
