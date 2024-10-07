import pino from "pino"
import { config } from "./config"

const isDevelopment = config.nodeEnv === "development"

const level = isDevelopment ? "debug" : "info"

const transport = isDevelopment
    ? {
          level,
          target: "pino-pretty",
          options: {
              colorize: true,
          },
      }
    : {
          level,
          target: "pino/file",
          options: {
              destination: "./logs/app.log",
              mkdir: true,
          },
      }

const logger = pino({ transport })

export default logger

// future todo - add redaction for sensitive data
