import { useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

import { AuthPaths } from "../constants/paths"

import LoadingPage from "@/features/misc/loading/page"

export default function ProtectedLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate(AuthPaths.LOGIN)
        }
    }, [isLoaded])

    if (!isLoaded) return <LoadingPage />

    return <Outlet />
}
