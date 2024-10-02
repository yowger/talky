import { Router } from "express"

import { getUsersByPaginationHandler } from "@/controllers/user-controller"

const router = Router()

router.get("/", getUsersByPaginationHandler)

export default router
