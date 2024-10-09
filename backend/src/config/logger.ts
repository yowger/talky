import pino from "pino"

import { config } from "./config"

import type { TransportTargetOptions } from "pino"

const isDevelopment = config.nodeEnv === "development"

const level = isDevelopment ? "debug" : "info"

const devTransport: TransportTargetOptions = {
    level,
    target: "pino-pretty",
    options: {
        colorize: true,
    },
}

const prodTransport: TransportTargetOptions = {
    level,
    target: "pino/file",
    options: {
        destination: "./logs/app.log",
        mkdir: true,
    },
}

const transport: TransportTargetOptions = isDevelopment
    ? devTransport
    : prodTransport

const logger = pino({ transport })

export default logger

// future todo - add redaction for sensitive data
