import z from "zod"

const envSchema = z.object({
    API_URL: z
        .string({
            required_error: "API_URL is required",
        })
        .url({ message: "API_URL must be a valid URL" }),
    CLERK_PUBLISHABLE_KEY: z.string(),
    PUSHER_KEY: z.string().min(1, { message: "PUSHER_KEY is required" }),
    PUSHER_CLUSTER: z
        .string()
        .min(1, { message: "PUSHER_CLUSTER is required" }),
})

const env = envSchema.parse({
    API_URL: import.meta.env.VITE_API_URL,
    CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    PUSHER_KEY: import.meta.env.VITE_PUSHER_KEY,
    PUSHER_CLUSTER: import.meta.env.VITE_PUSHER_CLUSTER,
})

export const config = {
    apiUrl: env.API_URL,
    clerk: {
        publishableKey: env.CLERK_PUBLISHABLE_KEY,
    },
    pusher: {
        key: env.PUSHER_KEY,
        cluster: env.PUSHER_CLUSTER,
    },
}
