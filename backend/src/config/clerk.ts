import { createClerkClient } from "@clerk/clerk-sdk-node"

import { config } from "@/config/config"

const clerkClient = createClerkClient({
    secretKey: config.clerk.secretKey,
    publishableKey: config.clerk.publishableKey,
})

export default clerkClient
