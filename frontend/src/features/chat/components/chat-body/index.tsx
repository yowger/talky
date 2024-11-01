import useChatStore from "../../stores/slices"

import ActiveChat from "./active-chat"
import Empty from "./empty"
import NewChat from "./new-chat"

export default function ChatMain() {
    const { isNewChat, activeChatId } = useChatStore()

    if (isNewChat) {
        return <NewChat />
    }

    if (activeChatId) {
        return <ActiveChat />
    }

    return <Empty />
}
