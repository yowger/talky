import ChatHeader from "../chat-header"
import MultipleSelector from "@/components/ui/multi-select"

import type { Option } from "@/components/ui/multi-select"

export default function NewChat() {
    const OPTIONS: Option[] = [
        { label: "coolTiger", value: "coolTiger" },
        { label: "fastFox", value: "fastFox" },
        { label: "swiftEagle", value: "swiftEagle" },
        { label: "silentWolf", value: "silentWolf" },
        { label: "braveLion", value: "braveLion" },
        { label: "cleverOtter", value: "cleverOtter" },
        { label: "boldElephant", value: "boldElephant" },
        { label: "gentlePanda", value: "gentlePanda" },
        { label: "wiseOwl", value: "wiseOwl" },
        { label: "nimbleCheetah", value: "nimbleCheetah" },
        { label: "mightyBear", value: "mightyBear" },
    ]

    return (
        <div className="flex flex-1 h-full flex-col justify-between overflow-y-auto">
            <ChatHeader>
                <div className="flex flex-1 items-center">
                    <span className="mr-2">To:</span>
                    <MultipleSelector defaultOptions={OPTIONS} />
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
