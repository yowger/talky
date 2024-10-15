import { ChevronLeft } from "lucide-react"

// import AvatarWithStatus from "@/components/common/avatar-with-status"
import { Button } from "@/components/ui/button"
import { PropsWithChildren } from "react"

type ChatHeader = PropsWithChildren

export default function ChatHeader(props: ChatHeader) {
    const { children } = props
    // const user = {
    //     name: "John doe",
    //     src: "https://randomuser.me/api/portraits/men/4.jpg",
    //     isOnline: true,
    // }

    return (
        <div className="h-14 sticky top-0 w-full border-b bg-white z-10">
            <div className="py-2 px-3 flex items-center gap-2 h-full">
                <div className="md:hidden block ">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </div>

                {/* <AvatarWithStatus {...user} />

                <h3 className="ms-3 font-semibold text-gray-800 dark:text-white">
                    Mark Wanner
                </h3> */}

                {children}
            </div>
        </div>
    )
}
