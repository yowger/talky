import AvatarWithStatus from "@/components/common/avatar-with-status"

export default function ChatHeader() {
    const user = {
        name: "John doe",
        src: "https://randomuser.me/api/portraits/men/4.jpg",
        isOnline: true,
    }

    return (
        <div className="py-2 px-3">
            <div className="shrink-0 group block">
                <div className="flex items-center">
                    <AvatarWithStatus {...user} />
                    <div className="ms-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                            Mark Wanner
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
