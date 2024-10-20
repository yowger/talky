import { UserModel } from "@/models/user-model"

import type { FilterQuery, UpdateQuery } from "mongoose"
import type { Optional } from "@/types/utils-types"
import type {
    PaginationOptions,
    PaginationResults,
} from "@/types/pagination-types"
import type { HydratedUserModel, UserModelType } from "@/models/user-model"

type CreateUser = Optional<
    Omit<UserModelType, "createdAt" | "updatedAt">,
    "status"
>

export async function createUser(
    userData: CreateUser
): Promise<HydratedUserModel> {
    return new UserModel(userData).save()
}

export async function findUserByClerkId(
    clerkId: string
): Promise<UserModelType | null> {
    return UserModel.findOne({ clerkId }).lean().exec()
}

export async function findUsers(
    filter: FilterQuery<UserModelType>
): Promise<UserModelType[]> {
    return UserModel.find(filter).lean().exec()
}

export interface PaginatedUserResults {
    users: UserModelType[]
    pagination: PaginationResults
}

export type UserSearchFilter = FilterQuery<HydratedUserModel>

export async function findUsersByPagination(
    username: string,
    options: PaginationOptions
): Promise<PaginatedUserResults> {
    const { page, pageSize } = options

    const limit = pageSize
    const offset = (page - 1) * pageSize

    const searchFilter: UserSearchFilter = username
        ? { username: { $regex: new RegExp(`^${username}`, "i") } }
        : {}

    const users = await UserModel.find(searchFilter)
        .limit(limit)
        .skip(offset)
        .lean()
        .exec()

    const totalCount = await UserModel.countDocuments(searchFilter)
    const totalPages = Math.ceil(totalCount / limit)

    return {
        users,
        pagination: {
            page,
            pageSize,
            totalCount,
            totalPages,
        },
    }
}

interface UserAutoCompleteOptions {
    limit?: number
}

type findUsersByAutocompleteResponse = Pick<
    UserModelType,
    "clerkId" | "username" | "imageUrl" | "status"
>

export async function findUsersByAutoComplete(
    username: string,
    options: UserAutoCompleteOptions = {}
): Promise<findUsersByAutocompleteResponse[]> {
    const { limit = 10 } = options

    const searchFilter: UserSearchFilter = username
        ? { username: { $regex: new RegExp(`^${username}`, "i") } }
        : {}

    return await UserModel.find(searchFilter)
        .limit(limit)
        .select("id clerkId username imageUrl status")
        .lean()
        .exec()
}

export async function deleteUser(
    clerkId: string
): Promise<HydratedUserModel | null> {
    return UserModel.findOneAndDelete({ clerkId }).exec()
}

export async function updateUser(
    clerkId: string,
    updateData: UpdateQuery<Partial<UserModelType>>
): Promise<HydratedUserModel | null> {
    return UserModel.findOneAndUpdate({ clerkId }, updateData, {
        new: true,
    }).exec()
}

export async function updateUserStatus(
    clerkId: string,
    status: UserModelType["status"]
): Promise<HydratedUserModel | null> {
    return UserModel.findOneAndUpdate(
        { clerkId },
        { status },
        { new: true }
    ).exec()
}
