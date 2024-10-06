import httpPino from "pino-http"

import logger from "@/config/logger"

const httpLogger = httpPino({
    logger,
})

export default httpLogger
