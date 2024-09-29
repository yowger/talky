import Axios from "axios"

import { config } from "@/config/config"

const axiosClient = Axios.create({
    baseURL: config.apiUrl,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
})

export default axiosClient
