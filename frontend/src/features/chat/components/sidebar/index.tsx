import { useClerk, useUser } from "@clerk/clerk-react"
import { lazy, Suspense, useState } from "react"
import { LogOut, MessageSquare, Users } from "lucide-react"

import { cn } from "@/lib/utils"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AvatarWithStatus from "@/components/common/avatar-with-status"
import { Button } from "@/components/ui/button"
import ChatListDisplay from "./chat"
import NavPanel from "./nav-panel"

import PanelItemButton from "./nav-panel/panel-item-button"

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
    const { user } = useUser()

    const panelItems: PanelItem[] = [
        {
            label: "people",
            icon: <Users className="h-4 w-4" />,
            isActive: selectedPanel === "people",
            onClick: () => setSelectedPanel("people"),
        },
        {
            label: "Chat",
            icon: <MessageSquare className="h-4 w-4" />,
            isActive: selectedPanel === "chat",
            onClick: () => setSelectedPanel("chat"),
        },
    ]

    function handleLogout() {
        signOut()
    }

    return (
        <div
            className={cn(
                "hidden h-full w-full fixed md:relative flex-1 md:flex-[0.5] lg:flex-[0.3] md:block border-r bg-white z-20",
                isSidebarOpen ? "flex" : ""
            )}
        >
            <div className="flex flex-col">
                <div className="border-b flex">
                    <NavPanel>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <AvatarWithStatus
                                    name={user?.username || ""}
                                    src={user?.imageUrl}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {user?.username || ""}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex gap-2 items-center">
                            {panelItems.map((item, index) => (
                                <PanelItemButton
                                    key={index}
                                    icon={item.icon}
                                    isActive={item.isActive}
                                    onClick={item.onClick}
                                />
                            ))}
                        </div>
                    </NavPanel>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    {selectedPanel === "chat" && <ChatListDisplay />}
                    {selectedPanel === "people" && <PeopleListDisplay />}
                </Suspense>
            </div>
        </div>
    )
}
