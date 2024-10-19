import { create } from "zustand"

import { createChatSlice } from "./state-slice"

import type { ChatStateSlice } from "./state-slice"

const useChatStore = create<ChatStateSlice>()((...a) => ({
    ...createChatSlice(...a),
}))

export default useChatStore
