import useChatStore from "../../stores/slices"
import NewChat from "./new-chat"
import ActiveChat from "./active-chat"

export default function ChatMain() {
    const { isNewChat } = useChatStore()

    if (isNewChat) {
        return <NewChat />
    }

    return <ActiveChat />
}
