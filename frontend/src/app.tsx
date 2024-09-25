import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AuthRoutes from "./routes/paths/auth"
import ChatRoutes from "@/routes/paths/chat"

import ProtectedLayout from "@/routes/layouts/Protected"
import RootLayout from "@/routes/layouts/Root"

import NotFoundPage from "@/features/misc/not-found/page"

export default function App() {
    const router = createBrowserRouter([
        {
            element: <RootLayout />,
            children: [
                ...AuthRoutes,
                {
                    element: <ProtectedLayout />,
                    children: [...ChatRoutes],
                },
            ],
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ])

    return <RouterProvider router={router} />
}
