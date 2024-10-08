import { Router } from "express"

import logger from "@/config/logger"

import webhook from "@/config/webhook"

import type {
    SessionJSON,
    UserJSON,
    DeletedObjectJSON,
    WebhookEvent,
} from "@clerk/clerk-sdk-node"

const router = Router()

router.post("/api/webhooks", async (req, res) => {
    const headers = req.headers
    const payload = req.body as WebhookEvent

    const svix_id = headers["svix-id"] as string
    const svix_timestamp = headers["svix-timestamp"] as string
    const svix_signature = headers["svix-signature"] as string

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        })
    }

    // const webhook = new Webhook(config.clerk.webhookSecret)

    let evt: WebhookEvent

    try {
        evt = webhook.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        logger.error(`Error verifying webhook: ${err.message}`)

        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
    console.log("🚀 ~ router.post ~ evt:", evt)

    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
    console.log("Webhook body:", evt.data)

    switch (eventType) {
        case "user.created": {
            break
        }
        case "user.updated": {
            break
        }
        case "user.deleted": {
            break
        }
        case "session.created": {
            break
        }
        case "session.ended":
        case "session.removed":
        case "session.revoked": {
            break
        }
    }

    return res.status(200).json({
        message: "Webhook received",
    })
})

export default router
