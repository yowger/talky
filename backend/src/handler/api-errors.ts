export enum HttpStatusCodes {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

interface ErrorConfig {
    name: string
    httpStatusCode: HttpStatusCodes
    isOperational?: boolean
    description?: string
}

export class BaseError extends Error {
    public readonly httpStatusCode: HttpStatusCodes
    public readonly isOperational: boolean

    constructor({
        name,
        httpStatusCode,
        isOperational = true,
        description,
    }: ErrorConfig) {
        super(description || name)

        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.httpStatusCode = httpStatusCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}

export class BadRequestError extends BaseError {
    constructor(
        description = "The request cannot be fulfilled due to bad syntax."
    ) {
        super({
            name: "Bad Request",
            httpStatusCode: HttpStatusCodes.BAD_REQUEST,
            description,
        })
    }
}

export class UnauthorizedError extends BaseError {
    constructor(description = "You are not authorized.") {
        super({
            name: "Unauthorized",
            httpStatusCode: HttpStatusCodes.UNAUTHORIZED,
            description,
        })
    }
}

export class ForbiddenError extends BaseError {
    constructor(
        description = "You don't have permission to access the requested resource."
    ) {
        super({
            name: "Forbidden",
            httpStatusCode: HttpStatusCodes.FORBIDDEN,
            description,
        })
    }
}

export class NotFoundError extends BaseError {
    constructor(description = "The requested resource could not be found.") {
        super({
            name: "Not Found",
            httpStatusCode: HttpStatusCodes.NOT_FOUND,
            description,
        })
    }
}

export class ConflictError extends BaseError {
    constructor(
        description = "The request could not be completed because of a conflict in the request."
    ) {
        super({
            name: "Conflict",
            httpStatusCode: HttpStatusCodes.CONFLICT,
            description,
        })
    }
}

export class InternalServerError extends BaseError {
    constructor(
        description = "Internal Server Error. Please try again later."
    ) {
        super({
            name: "Internal Server Error",
            httpStatusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            description,
        })
    }
}
