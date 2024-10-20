import { model, Schema } from "mongoose"

import type { HydratedDocumentFromSchema, InferSchemaType } from "mongoose"

export enum UserStatus {
    ONLINE = "online",
    OFFLINE = "offline",
}

const UserSchema = new Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            index: true,
        },
        imageUrl: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.OFFLINE,
        },
    },
    {
        timestamps: true,
    }
)

export const UserModel = model("User", UserSchema)
export type HydratedUserModel = HydratedDocumentFromSchema<typeof UserSchema>
export type UserModelType = InferSchemaType<typeof UserSchema>
