import { createBrowserRouter, RouterProvider } from "react-router-dom"

import RootLayout from "@/routes/layouts/root-layout"
import ProtectedLayout from "@/routes/layouts/protect-layout"
import GuestLayout from "@/routes/layouts/guest-layout"

import AuthRoutes from "@/routes/paths/auth"
import ChatRoutes from "@/routes/paths/chat"
import NotFoundPage from "@/features/misc/not-found/page"

export default function Routes() {
    const router = createBrowserRouter([
        {
            element: <RootLayout />,
            children: [
                {
                    element: <GuestLayout />,
                    children: [...AuthRoutes],
                },
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
