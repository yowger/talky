import { Outlet, useNavigate } from "react-router-dom"
import { ClerkProvider } from "@clerk/clerk-react"

import { config } from "@/config/config"

import { AuthPaths } from "@/routes/constants/paths"

export default function RootLayout() {
    const navigate = useNavigate()

    return (
        <ClerkProvider
            publishableKey={config.clerk.publishableKey}
            afterSignOutUrl={AuthPaths.LOGIN}
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
        >
            <Outlet />
        </ClerkProvider>
    )
}
