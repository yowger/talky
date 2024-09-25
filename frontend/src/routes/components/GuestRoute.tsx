import { Navigate, Outlet } from "react-router-dom"

export default function GuestRoute() {
    const isAuthenticated = false

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}
