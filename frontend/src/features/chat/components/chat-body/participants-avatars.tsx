import AvatarWithStatus from "@/components/common/avatar-with-status"

import { cn } from "@/lib/utils"

import type { Chat } from "../../types"

interface ParticipantsAvatarsProps {
    participants: Chat["participants"]
    maxDisplay?: number
    size?: "small" | "medium"
}

export default function ParticipantsAvatars(props: ParticipantsAvatarsProps) {
    const { participants, maxDisplay = 3, size = "small" } = props

    const displayedParticipants = participants.slice(0, maxDisplay)
    const remainingCount = participants.length - maxDisplay

    return (
        <div className="mt-1 flex -space-x-1 rtl:space-x-reverse">
            {displayedParticipants.map((displayedParticipant) => (
                <AvatarWithStatus
                    key={displayedParticipant.clerkId}
                    src={displayedParticipant.imageUrl}
                    name={displayedParticipant.username}
                    className={cn(size === "small" ? "size-6" : "size-10")}
                />
            ))}

            {remainingCount > 0 && (
                <div
                    className={cn(
                        "flex items-center justify-center border border-gray-300 rounded-full z-10 bg-white",
                        size === "small" ? "size-6" : "size-10"
                    )}
                >
                    <span className="text-gray-500">+{remainingCount}</span>
                </div>
            )}
        </div>
    )
}
