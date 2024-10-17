import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"

import axiosClient from "@/config/axios"

export default function useAxiosAuth() {
    const { getToken } = useAuth()

    useEffect(() => {
        const requestInterceptor = axiosClient.interceptors.request.use(
            async (config) => {
                const token = await getToken()

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                } else {
                    //todo - redirect login
                    console.log("no token")
                }

                return config
            },
            (error) => {
                console.log("🚀 ~ useEffect ~ error:", error)
                return Promise.reject(error)
            }
        )

        return () => {
            axiosClient.interceptors.request.eject(requestInterceptor)
        }
    }, [getToken])

    return axiosClient
}
