import { useQuery } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/use-axios-auth"

import type { AxiosInstance } from "axios"
import type { User } from "../types"

export type UsersAutoCompleteResponse = User[]

export function getUsersByAutoComplete(
    axiosClient: AxiosInstance,
    username: string
): Promise<UsersAutoCompleteResponse> {
    return axiosClient.get("/user/autocomplete", {
        params: { username },
    })
}

export function useGetUsersByAutoComplete(username: string) {
    const axiosAuth = useAxiosAuth()

    return useQuery({
        queryKey: ["users-autocomplete", username],
        queryFn: () => {
            return getUsersByAutoComplete(axiosAuth, username)
        },
        enabled: !!username,
    })
}
