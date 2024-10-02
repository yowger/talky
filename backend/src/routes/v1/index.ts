import { Router } from "express"

import chatRoute from "@/routes/v1/chat-route"
import userRoute from "@/routes/v1/users-route"

const router = Router()

interface Routes {
    path: string
    route: Router
}

const defaultRoutes: Routes[] = [
    {
        path: "/chat",
        route: chatRoute,
    },
    {
        path: "/user",
        route: userRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
