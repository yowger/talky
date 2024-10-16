import { UserModel } from "@/models/user-model"

import type { FilterQuery, UpdateQuery } from "mongoose"
import type { Optional } from "@/types/utils-types"
import type {
    PaginationOptions,
    PaginationResults,
} from "@/types/pagination-types"
import type { UserDocument } from "@/models/user-model"
import type { User } from "@/types/user-types"

type CreateUser = Optional<User, "status">

export async function createUser(userData: CreateUser): Promise<UserDocument> {
    const user = new UserModel(userData)

    return await user.save()
}

export async function findUserByClerkId(
    clerkId: string
): Promise<UserDocument | null> {
    return await UserModel.findOne({ clerkId }).lean()
}

export async function findUsers(
    filter: FilterQuery<User>
): Promise<UserDocument[]> {
    return await UserModel.find(filter).lean()
}

export interface PaginatedUserResults {
    users: UserDocument[]
    pagination: PaginationResults
}

export type UserSearchFilter = FilterQuery<UserDocument>

export async function findUsersByPagination(
    searchTerm: string,
    options: PaginationOptions
): Promise<PaginatedUserResults> {
    const { page, pageSize } = options

    const limit = pageSize
    const offset = (page - 1) * pageSize

    const searchFilter: UserSearchFilter = searchTerm
        ? {
              $or: [
                  { username: { $regex: new RegExp(`^${searchTerm}`, "i") } },
                  //   { email: { $regex: new RegExp(`^${searchTerm}`, "i") } },
              ],
          }
        : {}

    const users = await UserModel.find(searchFilter)
        .limit(limit)
        .skip(offset)
        .lean()
        .exec()

    const totalCount = await UserModel.countDocuments(searchFilter).lean()
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

export async function findUsersByAutoComplete(
    username: string,
    options: UserAutoCompleteOptions = {}
) {
    const { limit = 10 } = options

    const searchFilter: UserSearchFilter = username
        ? { username: { $regex: new RegExp(`^${username}`, "i") } }
        : {}

    const users = await UserModel.find(searchFilter)
        .limit(limit)
        .select("clerkId username imageUrl status")
        .lean()
        .exec()

    return users
}

export async function deleteUser(
    clerkId: string
): Promise<UserDocument | null> {
    return await UserModel.findOneAndDelete({ clerkId })
}

export async function updateUser(
    clerkId: string,
    updateData: UpdateQuery<Partial<User>>
): Promise<UserDocument | null> {
    return await UserModel.findOneAndUpdate({ clerkId }, updateData, {
        new: true,
    })
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
