import { create } from "zustand"

import { ChatStateSlice, createChatSlice } from "./state-slice"

const useChatStore = create<ChatStateSlice>()((...a) => ({
    ...createChatSlice(...a),
}))

export default useChatStore
