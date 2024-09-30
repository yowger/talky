import { ChevronLeft } from "lucide-react"

import AvatarWithStatus from "@/components/common/avatar-with-status"
import { Button } from "@/components/ui/button"

export default function ChatHeader() {
    const user = {
        name: "John doe",
        src: "https://randomuser.me/api/portraits/men/4.jpg",
        isOnline: true,
    }

    return (
        <div className="py-2 px-3 h-14">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-500">
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                <AvatarWithStatus {...user} />
                <div className="ms-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                        Mark Wanner
                    </h3>
                </div>
            </div>
        </div>
    )
}
