import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AuthRoutes from "./routes/paths/auth"

import GuestRoute from "@/routes/components/GuestRoute"
import NotFoundPage from "@/features/misc/not-found/page"

export default function App() {
    const router = createBrowserRouter([
        {
            element: <GuestRoute />,
            children: AuthRoutes,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ])

    return <RouterProvider router={router} />
}
