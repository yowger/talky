import { create } from "zustand"

import { createChatSlice } from "./state-slice"
import { createSelectedUsersSlice } from "./selected-users"

import type { ChatStateSlice } from "./state-slice"
import type { SelectedUsersSlice } from "./selected-users"

const useChatStore = create<ChatStateSlice & SelectedUsersSlice>()((...a) => ({
    ...createChatSlice(...a),
    ...createSelectedUsersSlice(...a),
}))

export default useChatStore
