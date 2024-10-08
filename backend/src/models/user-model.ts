import { model, Schema } from "mongoose"

import { UserStatus } from "@/types/user-types"

import type { Document } from "mongoose"
import type { User } from "@/types/user-types"

export type UserDocument = User & Document

const UserSchema = new Schema<UserDocument>(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
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

export const UserModel = model<UserDocument>("User", UserSchema)
