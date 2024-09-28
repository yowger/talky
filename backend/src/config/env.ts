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
})

const env = envSchema.parse(process.env)

export default env
