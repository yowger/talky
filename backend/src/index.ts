import "module-alias/register"

import mongoose from "mongoose"

import { config } from "@/config/config"
import logger from "@/config/logger"

import app from "@/app"

import type { Server } from "http"

let server: Server

mongoose
    .connect(config.mongoose.url)
    .then(() => {
        logger.info("Connected to MongoDB")

        server = app.listen(config.port, () => {
            logger.info(`Listening to port: ${config.port}`)
        })
    })
    .catch((error) => {
        logger.error("Failed to connect to MongoDB", error)

        process.exit(1)
    })

function unexpectedExitHandler() {
    if (server) {
        server.close(async () => {
            logger.info("Server closed")

            await mongoose.connection.close()
            logger.info("MongoDB connection closed")

            process.exit(1)
        })
    } else {
        process.exit(1)
    }
}

function unexpectedErrorHandler(error: Error) {
    logger.error(error)

    unexpectedExitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

function exitHandler() {
    if (server) {
        server.close(async () => {
            logger.info("Server closed")

            await mongoose.connection.close()
            logger.info("MongoDB connection closed")

            process.exit(0)
        })
    } else {
        process.exit(0)
    }
}

function gracefulExitHandler(signal: string) {
    logger.info(`Received ${signal} signal`)

    exitHandler()
}

process.on("SIGTERM", () => gracefulExitHandler("SIGTERM"))
process.on("SIGINT", () => gracefulExitHandler("SIGTERM"))
