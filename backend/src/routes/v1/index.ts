import { Router } from "express"

import chatRoute from "@/routes/v1/chat-route"
import userRoute from "@/routes/v1/users-route"
import messageRoute from "@/routes/v1/message-route"
import webhookRoute from "@/routes/v1/webhooks-route"

const router = Router()

interface Routes {
    path: string
    route: Router
}

const defaultRoutes: Routes[] = [
    {
        path: "/api/webhooks",
        route: webhookRoute,
    },
    {
        path: "/chat",
        route: chatRoute,
    },
    {
        path: "/message",
        route: messageRoute,
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
