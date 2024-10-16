import { config } from "@/config/config"
import logger from "@/config/logger"

import { ApiError } from "@/handler/api-errors"

import type { NextFunction, Request, Response } from "express"

export default function globalErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const isDev = config.nodeEnv !== "production"

    const logInfo: Record<string, any> = {
        path: req.path,
        statusCode: error instanceof ApiError ? error.httpStatusCode : 500,
        error: {
            message: error.message,
        },
        details: {},
    }

    if (isDev) {
        if (error instanceof ApiError && req.body) {
            logInfo.details.body = req.body
        }

        logInfo.error.stack = error.stack
    }

    const logLevel =
        error instanceof ApiError && error.isOperational ? "warn" : "error"

    logger[logLevel](logInfo)

    if (error instanceof ApiError) {
        return res.status(error.httpStatusCode).json({ message: error.message })
    }

    return res.status(500).json({
        message: "Internal server error",
    })
}
