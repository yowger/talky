import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarWithStatusProps {
    name: string
    src?: string
    isOnline?: boolean
    className?: string
}

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
    const { name, src, isOnline = false, className } = props

    const avatarFallback = name.slice(0, 2).toUpperCase()

    return (
        <div className="relative inline-block">
            <Avatar className={className}>
                <AvatarImage src={src} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            {isOnline && (
                <span className="absolute top-1 end-0 block w-2.5 h-2.5 rounded-full transform translate-x-1/2 ring-2 ring-white dark:ring-neutral-900 bg-green-400" />
            )}
        </div>
    )
}
