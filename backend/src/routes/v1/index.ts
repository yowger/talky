import { Router } from "express"

import chatRoute from "@/routes/v1/chat-route"

const router = Router()

const defaultRoutes = [
    {
        path: "/chat",
        route: chatRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
