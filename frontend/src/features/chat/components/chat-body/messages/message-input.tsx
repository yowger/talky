import { FileImage, SendHorizonal } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"

import { Button } from "@/components/ui/button"

import type { ChangeEvent, FormEvent } from "react"

interface MessageInputProps {
    value: string
    placeholder?: string
    isDisabled?: boolean
    onChange?: (value: string) => void
    onSendClick?: () => void
}

export default function MessageInput(props: MessageInputProps) {
    const {
        placeholder = "Type a message...",
        value,
        isDisabled,
        onSendClick,
        onChange = () => {},
    } = props

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value

        onChange(value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (onSendClick) onSendClick()
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()

            if (onSendClick) onSendClick()
        }
    }

    return (
        <div className="w-full sticky bottom-0 border-t bg-white z-10">
            <div className="flex gap-2 items-center p-4">
                <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
                    <Button type="button" variant="outline" size="icon">
                        <FileImage className="h-4 w-4" />
                    </Button>

                    <TextareaAutosize
                        value={value}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        maxRows={3}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="resize-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    />

                    <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        disabled={isDisabled}
                    >
                        <SendHorizonal className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

// todo
// onImageClick?: React.MouseEventHandler<HTMLButtonElement>
