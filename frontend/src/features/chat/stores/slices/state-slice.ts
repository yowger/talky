import type { PartialUser } from "../../types"
import type { StateCreator } from "zustand"

export interface ChatState {
    isNewChat: boolean
    activeChatId: string | null
    participants: PartialUser[]
}

export interface ChatStateActions {
    setActiveChat: (chatId: string, participants: PartialUser[]) => void
    setIsNewChat: (isNewChat: boolean) => void
}

export type ChatStateSlice = ChatState & ChatStateActions

const initialState: ChatState = {
    isNewChat: false,
    activeChatId: null,
    participants: [],
}

export const createChatSlice: StateCreator<ChatStateSlice> = (set) => ({
    ...initialState,
    setActiveChat: (chatId: string, participants: PartialUser[]) =>
        set({ activeChatId: chatId, participants, isNewChat: false }),
    setIsNewChat: (isOpen: boolean) =>
        set({ ...initialState, isNewChat: isOpen }),
})
