import type { ReactNode } from "react"

interface SidebarTitleProps {
    children: ReactNode
}

export default function SidebarTitle(props: SidebarTitleProps) {
    const { children } = props

    return (
        <h1 className="text-lg font-medium tracking-wide text-gray-600">
            {children}
        </h1>
    )
}
