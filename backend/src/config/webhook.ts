import { Webhook } from "svix"

import { config } from "@/config/config"

const webhook = new Webhook(config.clerk.webhookSecret)

export default webhook
