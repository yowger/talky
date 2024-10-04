import { useQuery } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { Pagination, User } from "../types"
import type { AxiosInstance } from "axios"

export interface UsersResponse {
    users: User[]
    pagination: Pagination
}

export function getUsers(axiosClient: AxiosInstance): Promise<UsersResponse> {
    return axiosClient.get("/user")
}

export function useGetUsers() {
    const axiosAuth = useAxiosAuth()

    return useQuery({
        queryKey: ["users"],
        queryFn: () => {
            return getUsers(axiosAuth)
        },
    })
}

// todo switch to infinite query
