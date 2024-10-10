import httpPino from "pino-http"
import pino from "pino"

import logger from "@/config/logger"

import { isWebhookHeaders } from "@/utils/webhook-utils"

import type { Request, Response } from "express"

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
    customProps: function (req: Request, res: Response) {
        if (isWebhookHeaders(req.headers) && res.statusCode >= 400) {
            return getWebhookDetails(req)
        }

        return undefined
    },
})

export default httpLogger

function getWebhookDetails(req: Request) {
    const payload = req.body

    if (payload) {
        const { "svix-id": svixId, "svix-timestamp": svixTimestamp } =
            req.headers
        const userId = payload?.data?.user_id || "unknown"
        const eventType = payload?.type || "unknown"

        return {
            details: {
                userId,
                webhook: {
                    id: svixId,
                    type: eventType,
                    timestamp: svixTimestamp,
                },
            },
        }
    }

    return undefined
}
