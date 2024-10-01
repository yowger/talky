import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

import type { ReactNode } from "react"

interface SidebarHeaderProps {
    children: ReactNode
    className?: string
}

export default function SidebarHeader(props: SidebarHeaderProps) {
    const { children, className } = props

    return (
        <div className={cn("flex items-center h-14 px-3 border-b", className)}>
            {children}

            <div className="block md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-500">
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
