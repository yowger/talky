import type { StateCreator } from "zustand"

export interface ChatState {
    isNewChat: boolean
}

export interface ChatStateActions {
    setIsNewChat: (isNewChat: boolean) => void
}

export type ChatStateSlice = ChatState & ChatStateActions

const initialState: ChatState = {
    isNewChat: false,
}

export const createChatSlice: StateCreator<ChatStateSlice> = (set) => ({
    ...initialState,
    setIsNewChat: (isOpen: boolean) => set({ isNewChat: isOpen }),
})
