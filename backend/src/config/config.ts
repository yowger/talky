import dotenv from "dotenv"
import z from "zod"

dotenv.config()

const envSchema = z.object({
    ALLOWED_ORIGINS: z
        .string()
        .transform((origins) => origins.split(","))
        .refine(
            (origins) =>
                origins.every(
                    (origin) => z.string().url().safeParse(origin).success
                ),
            {
                message: "ALLOWED_ORIGINS origin must be a valid URL",
            }
        ),
    // DATABASE_URL: z
    //     .string({
    //         required_error: "DATABASE_URL is required",
    //     })
    //     .url({ message: "DATABASE_URL must be a valid URL" }),
    NODE_ENV: z
        .enum(["development", "test", "production"], {
            errorMap: () => ({
                message:
                    "NODE_ENV must be one of 'development', 'test', or 'production'",
            }),
        })
        .default("development"),
    PORT: z.coerce
        .number()
        .positive()
        .max(65535, { message: "PORT must be between 1 and 65535" })
        .default(3000),
    CLERK_SECRET_KEY: z
        .string()
        .min(1, { message: "CLERK_SECRET_KEY is required" }),
    CLERK_PUBLISHABLE_KEY: z
        .string()
        .min(1, { message: "CLERK_PUBLISHABLE_KEY is required" }),
    PUSHER_APP_ID: z.string().min(1, { message: "PUSHER_APP_ID is required" }),
    PUSHER_KEY: z.string().min(1, { message: "PUSHER_KEY is required" }),
    PUSHER_SECRET: z.string().min(1, { message: "PUSHER_SECRET is required" }),
    PUSHER_CLUSTER: z
        .string()
        .min(1, { message: "PUSHER_CLUSTER is required" }),
})

const env = envSchema.parse(process.env)

export const config = {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    cors: {
        allowedOrigins: env.ALLOWED_ORIGINS,
    },
    clerk: {
        secretKey: env.CLERK_SECRET_KEY,
        publishableKey: env.CLERK_PUBLISHABLE_KEY,
    },
    pusher: {
        appId: env.PUSHER_APP_ID,
        key: env.PUSHER_KEY,
        secret: env.PUSHER_SECRET,
        cluster: env.PUSHER_CLUSTER,
    },
}
