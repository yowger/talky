import { BaseError } from "@/handler/api-errors"

import type { NextFunction, Request, Response } from "express"

export default function globalErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof BaseError) {
        return res.status(error.httpStatusCode).json({ message: error.message })
    }

    return res.status(500).json({
        message: "Internal server error",
    })
}
