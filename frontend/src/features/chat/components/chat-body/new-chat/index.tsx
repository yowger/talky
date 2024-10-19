import { useState } from "react"

import useChatStore from "@/features/chat/stores/slices"

import ChatHeader from "../chat-header"
import MessageInput from "../messages/message-input"
import UserMultiSelector from "./components/user-multi-selector"

import type { UserOption } from "./components/user-multi-selector"

export default function NewChat() {
    const [inputValue, setInputValue] = useState("")

    const addUser = useChatStore((state) => state.addUser)
    const clearSelectedUsers = useChatStore((state) => state.clearSelectedUsers)

    function handleOnChange(usersOption: UserOption[]) {
        clearSelectedUsers()

        usersOption.forEach((userOption) => {
            addUser({
                id: userOption.value,
                clerkId: userOption.value,
                username: userOption.label,
                imageUrl: userOption.imageUrl,
                status: userOption.status,
            })
        })
    }

    function handleNewChat() {
        console.log("new chat created...")
    }

    return (
        <div className="flex flex-1 h-full flex-col justify-between overflow-y-auto">
            <ChatHeader>
                <div className="flex flex-1 items-center">
                    <span className="mr-2">To:</span>

                    <UserMultiSelector onChange={handleOnChange} />
                </div>
            </ChatHeader>

            <div className="p-2 flex flex-1 items-center justify-center">
                <h3 className="text-lg text-gray-500 font-semibold text-center">
                    Select a user to start a conversation
                </h3>
            </div>

            <MessageInput
                onSendClick={handleNewChat}
                value={inputValue}
                onChange={setInputValue}
            />
        </div>
    )
}

// todo group by friends, user
// todo display image on autocomplete
