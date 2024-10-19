import type { StateCreator } from "zustand"

import type { User } from "@/features/chat/types"

export interface SelectedUsersState {
    selectedUsers: User[]
}

export interface SelectedUsersActions {
    addUser: (user: User) => void
    removeUser: (userId: string) => void
    clearSelectedUsers: () => void
}

export type SelectedUsersSlice = SelectedUsersState & SelectedUsersActions

const initialState: SelectedUsersState = {
    selectedUsers: [],
}

export const createSelectedUsersSlice: StateCreator<SelectedUsersSlice> = (
    set
) => ({
    ...initialState,
    addUser: (user: User) =>
        set((state) => ({
            selectedUsers: [...state.selectedUsers, user],
        })),
    removeUser: (clerkId: string) =>
        set((state) => ({
            selectedUsers: state.selectedUsers.filter(
                (user) => user.clerkId !== clerkId
            ),
        })),
    clearSelectedUsers: () => set({ selectedUsers: [] }),
})
