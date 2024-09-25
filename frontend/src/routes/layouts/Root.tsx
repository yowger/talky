import { Outlet, useNavigate } from "react-router-dom"
import { ClerkProvider } from "@clerk/clerk-react"

import { env } from "@/config/env"

import { AuthPaths } from "@/routes/constants/paths"

export default function RootLayout() {
    const navigate = useNavigate()

    return (
        <ClerkProvider
            publishableKey={env.CLERK_PUBLISHABLE_KEY}
            afterSignOutUrl={AuthPaths.LOGIN}
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
        >
            <Outlet />
        </ClerkProvider>
    )
}
