import { FilterQuery } from "mongoose"

import { UserModel } from "@/models/user-model"

import type { UserDocument } from "@/models/user-model"
import type { User } from "@/types/user-types"

export async function createUser(userData: User): Promise<UserDocument> {
    const user = new UserModel(userData)
    return await user.save()
}

export async function findUserByClerkId(
    clerkId: string
): Promise<UserDocument | null> {
    return await UserModel.findOne({ clerkId })
}

export async function findUsers(
    filter: FilterQuery<User>
): Promise<UserDocument[]> {
    return await UserModel.find(filter)
}

export async function deleteUser(
    clerkId: string
): Promise<UserDocument | null> {
    return await UserModel.findOneAndDelete({ clerkId })
}

export async function updateUserStatus(
    clerkId: string,
    status: User["status"]
): Promise<UserDocument | null> {
    return await UserModel.findOneAndUpdate(
        { clerkId },
        { status },
        { new: true }
    )
}
