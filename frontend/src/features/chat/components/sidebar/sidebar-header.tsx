import { cn } from "@/lib/utils"

import type { ReactNode } from "react"

interface SidebarHeaderProps {
    children: ReactNode
    className?: string
}

export default function SidebarHeader(props: SidebarHeaderProps) {
    const { children, className } = props

    return (
        <div
            className={cn(
                "flex items-center justify-between h-14 px-3 border-b",
                className
            )}
        >
            {children}
        </div>
    )
}
