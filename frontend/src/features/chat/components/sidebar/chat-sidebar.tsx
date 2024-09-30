import { lazy, Suspense, useState } from "react"
import { LogOut, MessageSquare, Users } from "lucide-react"

import { cn } from "@/lib/utils"

import NavPanel from "./nav-panel"

import type { PanelItem } from "./nav-panel"

const ChatListDisplay = lazy(() => import("./chat/chat-list-display"))
const PeopleListDisplay = lazy(() => import("./people/people-list-display"))

export type PanelType = "chat" | "people" | "logout"

export default function ChatSidebar() {
    const [selectedPanel, setSelectedPanel] = useState<PanelType>("chat")
    const isSidebarOpen = true

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
        },
    ]

    return (
        <div
            className={cn(
                "hidden h-full flex-1 md:flex-[0.5] lg:flex-[0.3] md:block border-r bg-white",
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
