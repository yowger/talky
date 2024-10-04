import type { Request, Response } from "express"

export default function invalidPathHandler(req: Request, res: Response) {
    res.status(404).json({
        message: "The requested API route was not found.",
    })
}
