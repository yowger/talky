import { useQuery } from "@tanstack/react-query"

import axiosClient from "@/config/axios"

import type { Pagination, User } from "../types"

export interface UsersResponse {
    users: User[]
    pagination: Pagination
}

export function getUsers(): Promise<UsersResponse> {
    return axiosClient.get("/user")
}

export function useGetUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    })
}

// todo switch to infinite query
