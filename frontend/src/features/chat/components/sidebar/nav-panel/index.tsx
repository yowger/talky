import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NavPanelProps {
    children: ReactNode
}

export default function NavPanel({ children }: NavPanelProps) {
    return (
        <div
            className={cn(
                "flex md:flex-col items-center gap-2 p-2 border-r bg-gray-100"
            )}
        >
            {children}
        </div>
    )
}
