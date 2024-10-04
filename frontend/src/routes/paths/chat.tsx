import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import { ChatPaths } from "../constants/paths"

const ChatPage = lazy(() => import("@/features/chat/page"))
const ProfilePage = lazy(() => import("@/features/profile/page"))

const ChatRoutes = [
    { path: ChatPaths.CHAT, element: <ChatPage /> },
    { path: ChatPaths.PROFILE, element: <ProfilePage /> },
] satisfies RouteObject[]

export default ChatRoutes
