import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NavPanelProps {
    children: ReactNode
}

export default function NavPanel({ children }: NavPanelProps) {
    return (
        <div className={cn("flex gap-2 p-2 items-center justify-between w-full")}>
            {children}
        </div>
    )
}
