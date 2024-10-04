import { useClerk } from "@clerk/clerk-react"
import { lazy, Suspense, useState } from "react"
import { LogOut, MessageSquare, Users } from "lucide-react"

import { cn } from "@/lib/utils"

import AvatarWithStatus from "@/components/common/avatar-with-status"
import { Button } from "@/components/ui/button"
import ChatListDisplay from "./chat"
import NavPanel from "./nav-panel"

import PanelItemButton from "./panel-item-button"

import type { ReactNode } from "react"

const PeopleListDisplay = lazy(() => import("./people"))

type PanelType = "chat" | "people" | "logout"
type PanelItem = {
    label: string
    icon: ReactNode
    isActive?: boolean
    onClick?: () => void
}

export default function ChatSidebar() {
    const isSidebarOpen = true

    const [selectedPanel, setSelectedPanel] = useState<PanelType>("chat")
    const { signOut } = useClerk()

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
            onClick: () => {
                setSelectedPanel("logout")
                signOut()
            },
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
                <NavPanel>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full flex-1 md:flex-none"
                    >
                        <AvatarWithStatus name="Clerk" />
                    </Button>

                    {panelItems.map((item, index) => (
                        <PanelItemButton
                            key={index}
                            icon={item.icon}
                            isActive={item.isActive}
                            onClick={item.onClick}
                        />
                    ))}
                </NavPanel>

                <Suspense fallback={<div>Loading...</div>}>
                    {selectedPanel === "chat" && <ChatListDisplay />}
                    {selectedPanel === "people" && <PeopleListDisplay />}
                </Suspense>
            </div>
        </div>
    )
}
