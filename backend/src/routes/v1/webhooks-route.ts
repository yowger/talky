import { Router } from "express"
import { Webhook } from "svix"

import { config } from "@/config/config"
import logger from "@/config/logger"

const router = Router()

router.post("/api/webhooks", async (req, res) => {
    console.log("WEBHOOKS")
    const headers = req.headers
    const payload = req.body
    console.log("🚀 ~ router.post ~ payload:", payload)

    const svix_id = headers["svix-id"] as string
    const svix_timestamp = headers["svix-timestamp"] as string
    const svix_signature = headers["svix-signature"] as string

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        })
    }

    const webhook = new Webhook(config.clerk.webhookSecret)

    let evt: any

    try {
        evt = webhook.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        })
    } catch (err) {
        logger.error(`Error verifying webhook: ${err.message}`)

        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }

    // const { id } = evt.data
    // const eventType = evt.type

    // console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
    // console.log("Webhook body:", evt.data)

    return res.status(200).json({
        message: "Webhook received",
    })
})

export default router
