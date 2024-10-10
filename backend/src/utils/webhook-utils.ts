import { WebhookRequiredHeaders } from "svix"

export function isWebhookHeaders(
    headers: any
): headers is WebhookRequiredHeaders {
    return (
        typeof headers["svix-id"] === "string" &&
        typeof headers["svix-timestamp"] === "string" &&
        typeof headers["svix-signature"] === "string"
    )
}
