import { UserProfile } from "@clerk/clerk-react"

import { ChatPaths } from "@/routes/constants/paths"

export default function ProfilePage() {
    return <UserProfile path={ChatPaths.PROFILE} routing="path" />
}
