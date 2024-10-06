import pino from "pino"
import { config } from "./config"

const isDevelopment = config.nodeEnv === "development"

const level = isDevelopment ? "debug" : "info"

const transport = isDevelopment
    ? {
          target: "pino-pretty",
          options: {
              colorize: true,
          },
      }
    : {
          target: "pino/file",
          options: {
              destination: "./logs/app.log",
              mkdir: true,
          },
      }

const logger = pino({ level, transport })

export default logger

// future todo - add redaction for sensitive data
