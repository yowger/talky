import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { ChatPaths } from "@/routes//constants/paths"

export default function GuestLayout() {
    const navigate = useNavigate()
    const { isSignedIn, isLoaded } = useAuth()

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate(ChatPaths.CHAT)
        }
    }, [isLoaded])

    return <Outlet />
}
