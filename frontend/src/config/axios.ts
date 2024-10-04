import Axios from "axios"

import { config } from "@/config/config"

const axiosClient = Axios.create({
    baseURL: config.apiUrl,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    timeout: 15000,
})

axiosClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosClient

// todo make one for auth