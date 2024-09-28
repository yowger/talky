import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import express from "express"

import createCorsOptions from "@/config/cors"
import env from "@/config/env"

const app = express()

app.use(cors(createCorsOptions(env.ALLOWED_ORIGINS)))
app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(
    express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
)
app.use(compression())

export default app
