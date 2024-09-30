import { cn } from "@/lib/utils"

import type { ReactNode } from "react"

interface SidebarBodyProps {
    children: ReactNode
    className?: string
}

export default function SidebarBody(props: SidebarBodyProps) {
    const { children, className } = props

    return <div className={cn("flex-1", className)}>{children}</div>
}
