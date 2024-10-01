import PeopleList from "./people-list"
import SidebarBody from "../sidebar-body"
import SidebarHeader from "../sidebar-header"
import SidebarTitle from "../sidebar-title"

export default function PeopleListDisplay() {
    return (
        <SidebarBody>
            <SidebarHeader>
                <div className="flex flex-1 items-center justify-between">
                    <SidebarTitle>People</SidebarTitle>
                </div>
            </SidebarHeader>

            <PeopleList />
        </SidebarBody>
    )
}
