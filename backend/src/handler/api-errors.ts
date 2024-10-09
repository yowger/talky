export enum HttpStatusCodes {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

type Details = Record<string, any>

interface ErrorConfig {
    name: string
    httpStatusCode: HttpStatusCodes
    isOperational?: boolean
    description?: string
    details?: Details
}

export class ApiError extends Error {
    public readonly httpStatusCode: HttpStatusCodes
    public readonly isOperational: boolean
    public readonly details: Details

    constructor(errorConfig: ErrorConfig) {
        const {
            name,
            httpStatusCode,
            isOperational = true,
            description,
            details,
        } = errorConfig

        super(description)

        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.httpStatusCode = httpStatusCode
        this.isOperational = isOperational
        this.details = details || {}

        Error.captureStackTrace(this)
    }
}

export class BadRequestError extends ApiError {
    constructor(
        description = "The request cannot be fulfilled due to bad syntax.",
        details: Details = {}
    ) {
        super({
            name: "Bad Request",
            httpStatusCode: HttpStatusCodes.BAD_REQUEST,
            description,
            details,
        })
    }
}

export class UnauthorizedError extends ApiError {
    constructor(
        description = "You are not authorized.",
        details: Details = {}
    ) {
        super({
            name: "Unauthorized",
            httpStatusCode: HttpStatusCodes.UNAUTHORIZED,
            description,
            details,
        })
    }
}

export class ForbiddenError extends ApiError {
    constructor(
        description = "You don't have permission to access the requested resource.",
        details: Details = {}
    ) {
        super({
            name: "Forbidden",
            httpStatusCode: HttpStatusCodes.FORBIDDEN,
            description,
            details,
        })
    }
}

export class NotFoundError extends ApiError {
    constructor(
        description = "The requested resource could not be found.",
        details: Details = {}
    ) {
        super({
            name: "Not Found",
            httpStatusCode: HttpStatusCodes.NOT_FOUND,
            description,
            details,
        })
    }
}

export class ConflictError extends ApiError {
    constructor(
        description = "The request could not be completed because of a conflict in the request.",
        details: Details = {}
    ) {
        super({
            name: "Conflict",
            httpStatusCode: HttpStatusCodes.CONFLICT,
            description,
            details,
        })
    }
}

export class InternalServerError extends ApiError {
    constructor(
        description = "Internal Server Error. Please try again later.",
        details: Details = {}
    ) {
        super({
            name: "Internal Server Error",
            httpStatusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            description,
            details,
        })
    }
}
