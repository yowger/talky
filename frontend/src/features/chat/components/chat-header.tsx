import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatHeader() {
    return (
        <div className="p-2">
            <div className="shrink-0 group block">
                <div className="flex items-center">
                    <div className="relative inline-block">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-1  end-0 block size-2.5 rounded-full transform translate-y-1/2 ring-2 ring-white bg-green-400 dark:ring-neutral-900"></span>
                    </div>
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
