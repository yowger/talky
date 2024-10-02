import { ErrorBoundary } from "react-error-boundary"
import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"

import queryClient from "@/config/react-query"

import LoadingPage from "@/features/misc/loading/page"

import App from "@/app"
import ErrorFallback from "@/components/common/error-fallback"

import "@/index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<LoadingPage />}>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ErrorBoundary>
        </Suspense>
    </StrictMode>
)
