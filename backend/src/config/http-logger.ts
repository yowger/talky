import httpPino from "pino-http"
import pino from "pino"

import { config } from "@/config/config"
import logger from "@/config/logger"

import { isWebhookHeaders } from "@/utils/webhook-utils"

import type { Request, Response } from "express"
import type { WebhookEvent } from "@clerk/clerk-sdk-node"

const httpLogger = httpPino({
    logger,
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
    customLogLevel: function (req, res, err) {
        const { statusCode } = res

        if (statusCode >= 400 && statusCode < 500) {
            return "warn"
        } else if (statusCode >= 500 || err) {
            return "error"
        }

        return "info"
    },
    customProps: function (req: Request, res: Response) {
        const isDevelopment = config.nodeEnv === "development"
        const statusCodeThreshold = isDevelopment ? 200 : 400

        if (
            isWebhookHeaders(req.headers) &&
            res.statusCode >= statusCodeThreshold
        ) {
            return getWebhookDetails(req)
        }

        return undefined
    },
})

export default httpLogger

type ExtendedRequest = Request<{}, {}, WebhookEvent>

function getWebhookDetails(req: ExtendedRequest) {
    const payload = req.body

    if (payload) {
        const { "svix-id": svixId, "svix-timestamp": svixTimestamp } =
            req.headers
        const eventType = payload.type

        const webhookDetails = {
            webhook: {
                id: svixId,
                type: eventType,
                timestamp: svixTimestamp,
            },
        }

        switch (eventType) {
            case "session.created":
            case "session.ended":
            case "session.removed":
                return {
                    details: {
                        userId: payload.data.user_id,
                        ...webhookDetails,
                    },
                }
            case "user.created":
            case "user.updated":
            case "user.deleted":
                return {
                    details: {
                        userId: payload.data.id,
                        ...webhookDetails,
                    },
                }
            default:
                return {
                    details: webhookDetails,
                }
        }
    }

    return undefined
}
