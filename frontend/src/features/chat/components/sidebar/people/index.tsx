import PeopleList from "./people-list"
import SidebarBody from "../sidebar-body"
import SidebarHeader from "../sidebar-header"
import SidebarTitle from "../sidebar-title"

import { useGetUsers } from "@/features/chat/api/use-get-users"

import type { User } from "@/features/chat/types"

export default function PeopleListDisplay() {
    const { data, status } = useGetUsers()
    console.log("🚀 ~ PeopleListDisplay ~ data:", data)

    function handlePersonClick(person: User) {
        console.log("Person clicked:", person)
    }

    return (
        <SidebarBody>
            <SidebarHeader>
                <div className="flex flex-1 items-center justify-between">
                    <SidebarTitle>People</SidebarTitle>
                </div>
            </SidebarHeader>

            <div className=" p-2">
                {status === "pending" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Failed to load users</span>
                ) : (
                    <PeopleList
                        people={data.users}
                        onClick={handlePersonClick}
                    />
                )}
            </div>
        </SidebarBody>
    )
}
