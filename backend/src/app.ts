import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import express from "express"

import createCorsOptions from "@/config/cors"
import { config } from "@/config/config"

import routes from "@/routes/v1"

const app = express()

app.use(helmet())
app.use(cors(createCorsOptions(config.cors.allowedOrigins)))
app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(
    express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
)
app.use(compression())

app.use("/v1", routes)

export default app
