import httpPino from "pino-http"

import logger from "@/config/logger"

import pino from "pino"

const httpLogger = httpPino({
    logger,
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return "warn"
        } else if (res.statusCode >= 500 || err) {
            return "error"
        }

        return "info"
    },
})

export default httpLogger
