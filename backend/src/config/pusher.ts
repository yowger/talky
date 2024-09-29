import Pusher from "pusher"

import { config } from "@/config/config"

const { appId, key, secret, cluster } = config.pusher

const pusher = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
})

export default pusher
