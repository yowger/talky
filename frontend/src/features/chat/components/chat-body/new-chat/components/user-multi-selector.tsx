import { useRef, useState } from "react"
import Select from "react-select"
import debounce from "lodash.debounce"

import { useGetUsersByAutoComplete } from "@/features/chat/api/use-get-users-autocomplete"

import AvatarWithStatus from "@/components/common/avatar-with-status"

import type { InputActionMeta, MultiValue } from "react-select"
import type { User } from "@/features/chat/types"

type PartialUser = Pick<User, "imageUrl" | "status">

export interface UserOption extends PartialUser {
    key: User["clerkId"]
    value: User["clerkId"]
    label: User["username"]
}

interface UserMultiSelectorProps {
    onChange?: (selectedUsers: UserOption[]) => void
}

export default function UserMultiSelector(props: UserMultiSelectorProps) {
    const { onChange } = props

    const [inputText, setInputText] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")

    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersByAutoComplete(searchText)

    const handleSearchDebounced = useRef(
        debounce((searchText) => setSearchText(searchText), 300)
    ).current

    function handleInputChange(inputText: string, meta: InputActionMeta) {
        if (meta.action !== "input-blur" && meta.action !== "menu-close") {
            setInputText(inputText)
            handleSearchDebounced(inputText)
        }
    }

    function noOptionsMessage(obj: { inputValue: string }) {
        if (obj.inputValue.trim().length === 0) {
            return null
        }

        return "No matching users"
    }

    function formatUsers(users: User[]): UserOption[] {
        return users.map((user: User) => ({
            key: user.clerkId,
            value: user.clerkId,
            label: user.username,
            imageUrl: user.imageUrl,
            status: user.status,
        }))
    }

    const userOptions: UserOption[] | undefined = users
        ? formatUsers(users)
        : []

    function handleChange(selected: MultiValue<UserOption>) {
        if (onChange) onChange(selected as UserOption[])
    }

    if (isError) {
        return <p>Failed to load users</p>
    }

    return (
        <Select
            options={userOptions}
            inputValue={inputText}
            filterOption={null}
            isLoading={isLoading}
            isClearable={true}
            isMulti={true}
            onInputChange={handleInputChange}
            onChange={handleChange}
            formatOptionLabel={formatOptionLabel}
            noOptionsMessage={noOptionsMessage}
            className="w-full text-sm"
            placeholder="Search for users..."
        />
    )
}

type UsersOptions = UserOption

function formatOptionLabel(option: UsersOptions) {
    return (
        <div className="flex overflow-hidden items-center rounded">
            <AvatarWithStatus
                name={option.label}
                src={option.imageUrl}
                className="w-6 h-6"
            />

            <span className="ms-2 flex items-center text-nowrap text-ellipsis flex-1">
                {option.label}
            </span>
        </div>
    )
}

// todo - redo design