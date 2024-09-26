import TextareaAutosize from "react-textarea-autosize"
import { FileImage, SendHorizonal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MessageInput() {
    return (
        <div className="flex gap-2 items-center p-4">
            <Button variant="outline" size="icon">
                <FileImage className="h-4 w-4" />
            </Button>
            <TextareaAutosize
                className="resize-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                maxRows={3}
            />
            <Button variant="outline" size="icon">
                <SendHorizonal className="h-4 w-4" />
            </Button>
        </div>
    )
}
