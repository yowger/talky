import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import PeopleList from "./people-list"
import SidebarBody from "../sidebar-body"
import SidebarHeader from "../sidebar-header"
import SidebarTitle from "../sidebar-title"

export default function PeopleListDisplay() {
    return (
        <SidebarBody>
            <SidebarHeader>
                <SidebarTitle>People</SidebarTitle>

                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full text-gray-500"
                >
                    <UserPlus className="h-4 w-4" />
                </Button>
            </SidebarHeader>

            <PeopleList />
        </SidebarBody>
    )
}
