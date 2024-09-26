import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarWithStatusProps {
    name: string
    src?: string
    isOnline?: boolean
}

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
    const { name, src, isOnline = false } = props

    const avatarFallback = name.slice(0, 2).toUpperCase()

    return (
        <div className="relative inline-block">
            <Avatar>
                <AvatarImage src={src} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            {isOnline && (
                <span className="absolute bottom-1 end-0 block w-2.5 h-2.5 rounded-full transform translate-y-1/2 ring-2 ring-white dark:ring-neutral-900 bg-green-400" />
            )}
        </div>
    )
}
