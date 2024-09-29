import { useState } from "react"
import { FileImage, SendHorizonal } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"

import { Button } from "@/components/ui/button"

import type { ChangeEvent, FormEvent } from "react"

interface MessageInputProps {
    onChange?: (value: string) => void
    onSendClick?: (value: string) => void
    placeholder?: string
}

export default function MessageInput(props: MessageInputProps) {
    const { onSendClick, onChange, placeholder = "Type a message..." } = props

    const [inputValue, setInputValue] = useState("")

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value
        setInputValue(value)

        if (onChange) onChange(value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (onSendClick && inputValue.trim()) {
            onSendClick(inputValue)

            setInputValue("")
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit(event as unknown as FormEvent<HTMLFormElement>)
        }
    }

    return (
        <div className="flex gap-2 items-center p-4">
            <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
                <Button type="button" variant="outline" size="icon">
                    <FileImage className="h-4 w-4" />
                </Button>

                <TextareaAutosize
                    className="resize-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    maxRows={3}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                />

                <Button
                    type="submit"
                    variant="outline"
                    size="icon"
                    disabled={!inputValue.trim()}
                >
                    <SendHorizonal className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}

// todo
// onImageClick?: React.MouseEventHandler<HTMLButtonElement>
