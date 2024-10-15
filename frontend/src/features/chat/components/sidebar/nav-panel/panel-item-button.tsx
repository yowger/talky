import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PanelItemButtonProps {
    icon: ReactNode
    isActive?: boolean
    onClick?: () => void
}

export default function PanelItemButton(props: PanelItemButtonProps) {
    const { icon, isActive, onClick } = props

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn(
                "text-gray-700 hover:bg-gray-300 flex-1 md:flex-none",
                isActive && "bg-gray-200"
            )}
            onClick={onClick}
        >
            {icon}
        </Button>
    )
}
