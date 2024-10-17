import ChatHeader from "../chat-header"

import UserMultiSelector from "./components/user-multi-selector"

export default function NewChat() {
    return (
        <div className="flex flex-1 h-full flex-col justify-between overflow-y-auto">
            <ChatHeader>
                <div className="flex flex-1 items-center">
                    <span className="mr-2">To:</span>

                    <UserMultiSelector />
                </div>
            </ChatHeader>

            <div className="p-2 flex flex-1 items-center justify-center">
                <h3 className="text-lg text-gray-500 font-semibold text-center">
                    Select a user to start a conversation
                </h3>
            </div>
        </div>
    )
}

// todo group by friends, user
// todo display image on autocomplete
