import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import express from "express"

import { config } from "@/config/config"
import createCorsOptions from "@/config/cors"
import httpLogger from "@/config/http-logger"

import invalidPathHandler from "@/middlewares/invalid-path-handler"
import globalErrorHandler from "@/middlewares/global-error-handler"

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
app.use(httpLogger)

app.use("/v1", routes)

app.use(invalidPathHandler)
app.use(globalErrorHandler)

export default app
