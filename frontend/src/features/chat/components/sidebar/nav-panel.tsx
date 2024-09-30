import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import type { ReactNode } from "react"

export interface PanelItem {
    label: string
    icon: ReactNode
    isActive?: boolean
    onClick?: () => void
}

interface NavPanelProps {
    items: PanelItem[]
}

export default function NavPanel(props: NavPanelProps) {
    const { items } = props

    return (
        <div
            className={
                "flex md:flex-col items-center gap-2 p-2 border-r bg-gray-100"
            }
        >
            {items.map((item) => {
                const { icon, isActive, onClick } = item

                function handleOnClick() {
                    if (onClick) onClick()
                }

                return (
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "text-gray-500 flex-1 md:flex-none",
                            isActive && "bg-gray-200"
                        )}
                        onClick={handleOnClick}
                    >
                        {icon}
                    </Button>
                )
            })}
        </div>
    )
}
