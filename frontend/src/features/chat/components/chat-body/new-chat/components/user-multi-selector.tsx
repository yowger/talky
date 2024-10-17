import { useRef, useState } from "react"
import Select from "react-select"
import debounce from "lodash.debounce"

import { useGetUsersByAutoComplete } from "@/features/chat/api/use-get-users-autocomplete"

import type { InputActionMeta } from "react-select"

export interface UserOption {
    readonly value: string
    readonly label: string
}

export default function UserMultiSelector() {
    const [inputText, setInputText] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")

    const { data: users, isLoading } = useGetUsersByAutoComplete(searchText)
    console.log("🚀 ~ UserMultiSelector ~ users:", users)

    const handleSearchDebounced = useRef(
        debounce((searchText) => setSearchText(searchText), 300)
    ).current

    function handleInputChange(inputText: string, meta: InputActionMeta) {
        if (meta.action !== "input-blur" && meta.action !== "menu-close") {
            setInputText(inputText)
            handleSearchDebounced(inputText)
        }
    }

    return (
        <Select
            isMulti
            inputValue={inputText}
            isLoading={isLoading}
            filterOption={null}
            onInputChange={handleInputChange}
            className="w-full text-sm"
            placeholder="Search for users..."
        />
    )
}
