import { StrictMode, Suspense } from "react"
import { ClerkProvider } from "@clerk/clerk-react"
import { createRoot } from "react-dom/client"

import { env } from "./config/env"

import App from "./app"
import LoadingPage from "@/features/misc/loading/page"

import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={env.CLERK_PUBLISHABLE_KEY}>
            <Suspense fallback={<LoadingPage />}>
                <App />
            </Suspense>
        </ClerkProvider>
    </StrictMode>
)
