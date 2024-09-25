import { Navigate, Outlet, useLocation } from "react-router-dom"

import { AuthPaths } from "../constants/paths"

export default function ProtectedRoute() {
    const location = useLocation()
    const isAuthenticated = true

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={AuthPaths.LOGIN} replace state={{ from: location }} />
    )
}
