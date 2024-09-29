import pusher from "@/config/pusher"

export function broadcastMessage(message: string) {
    pusher.trigger("chat", "new-message", {
        message,
    })
}
