import { z } from "zod"

import { BadRequestError, InternalServerError } from "@/handler/api-errors"

import { ZodError } from "zod"

import type { Either } from "@/types/utils-types"
import type { NextFunction, Request, Response } from "express"

type ZodObject = z.ZodObject<any, any>

interface ReqBody {
    body: ZodObject
}

interface ReqQuery {
    query: ZodObject
}

type BothReq = ReqBody & ReqQuery
type ValidateRequest = Either<ReqBody, ReqQuery> | BothReq

export default function validateRequest(schema: ValidateRequest) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                schema.body.parse(req.body)
            }

            if (schema.query) {
                schema.query.parse(req.query)
            }

            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }))

                throw new BadRequestError("Invalid data", {
                    details: errorMessages,
                })
            }

            throw new InternalServerError()
        }
    }
}
