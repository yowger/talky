import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"

import queryClient from "@/config/react-query"

import App from "./app"
import LoadingPage from "@/features/misc/loading/page"

import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<LoadingPage />}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Suspense>
    </StrictMode>
)
