import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"

import App from "./app"
import LoadingPage from "@/features/misc/loading/page"

import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<LoadingPage />}>
            <App />
        </Suspense>
    </StrictMode>
)
