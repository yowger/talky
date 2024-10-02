import { useErrorBoundary } from "react-error-boundary"

import { Button } from "@/components/ui/button"

export default function ErrorFallback() {
    const { resetBoundary } = useErrorBoundary()

    return (
        <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
            <h2>Something went wrong:</h2>

            <Button onClick={resetBoundary}>Try again</Button>
        </div>
    )
}
