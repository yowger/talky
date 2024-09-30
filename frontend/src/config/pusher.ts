import Pusher from "pusher-js"

import { config } from "@/config/config"

const { key, cluster } = config.pusher

const pusherClient = new Pusher(key, {
    cluster,
})

export default pusherClient
