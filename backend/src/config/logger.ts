import pino from "pino"
import { config } from "./config"

const level = config.nodeEnv === "development" ? "debug" : "info"

const logger = pino({
    transport: {
        level,
        target: "pino/file",
        options: {
            colorize: true,
            destination: "./logs/app.log",
            mkdir: true,
        },
    },
})

export default logger

// future todo - add redaction for sensitive data
