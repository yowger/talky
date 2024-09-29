import z from "zod"

const envSchema = z.object({
    CLERK_PUBLISHABLE_KEY: z.string(),
})

const env = envSchema.parse({
    CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
})

export const config = {
    clerk: {
        publishableKey: env.CLERK_PUBLISHABLE_KEY,
    },
}
