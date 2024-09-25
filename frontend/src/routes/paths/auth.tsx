import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import { AuthPaths } from "../constants/paths"

const SignInPage = lazy(() => import("@/features/auth/sign-in/page"))
const SignUpPage = lazy(() => import("@/features/auth/sign-up/page"))

const AuthRoutes = [
    { path: AuthPaths.LOGIN, element: <SignInPage /> },
    { path: AuthPaths.REGISTER, element: <SignUpPage /> },
] satisfies RouteObject[]

export default AuthRoutes
