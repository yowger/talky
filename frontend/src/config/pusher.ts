import Pusher from "pusher-js"

import { config } from "@/config/config"

const { key, cluster } = config.pusher

const pusher = new Pusher(key, {
    cluster,
})

export default pusher
