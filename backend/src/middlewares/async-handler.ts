import type { Request, Response, NextFunction } from "express"

type Controller = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

export default function asyncHandler(controller: Controller) {
    return async function (req: Request, res: Response, next: NextFunction) {
        controller(req, res, next).catch(next)
    }
}
