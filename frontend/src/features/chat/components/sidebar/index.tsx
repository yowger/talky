import { useClerk } from "@clerk/clerk-react"
import { lazy, Suspense, useState } from "react"
import { LogOut, MessageSquare, Users } from "lucide-react"

import { cn } from "@/lib/utils"

import ChatListDisplay from "./chat"
import NavPanel from "./nav-panel"

import type { PanelItem } from "./nav-panel"

const PeopleListDisplay = lazy(() => import("./people"))

export type PanelType = "chat" | "people" | "logout"

export default function ChatSidebar() {
    const isSidebarOpen = true

    const [selectedPanel, setSelectedPanel] = useState<PanelType>("chat")
    const { signOut } = useClerk()

    function handleLogOut() {
        setSelectedPanel("logout")

        signOut()
    }

    const panelItems: PanelItem[] = [
        {
            label: "Chat",
            icon: <MessageSquare className="h-4 w-4" />,
            isActive: selectedPanel === "chat",
            onClick: () => setSelectedPanel("chat"),
        },
        {
            label: "people",
            icon: <Users className="h-4 w-4" />,
            isActive: selectedPanel === "people",
            onClick: () => setSelectedPanel("people"),
        },
        {
            label: "Logout",
            icon: <LogOut className="h-4 w-4" />,
            isActive: selectedPanel === "logout",
            onClick: handleLogOut,
        },
    ]

    return (
        <div
            className={cn(
                "hidden h-full w-full fixed md:relative flex-1 md:flex-[0.5] lg:flex-[0.3] md:block border-r bg-white z-20",
                isSidebarOpen ? "flex" : ""
            )}
        >
            <div className="flex flex-col-reverse md:flex-row h-full flex-1">
                <NavPanel items={panelItems} />

                <Suspense fallback={<div>Loading...</div>}>
                    {selectedPanel === "chat" && <ChatListDisplay />}
                    {selectedPanel === "people" && <PeopleListDisplay />}
                </Suspense>
            </div>
        </div>
    )
}
