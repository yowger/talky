import { Router } from "express"

import asyncHandler from "@/middlewares/async-handler"

import { clerkWebHooksHandler } from "@/controllers/web-hooks-controller"

const router = Router()

router.post("/", asyncHandler(clerkWebHooksHandler))

export default router
