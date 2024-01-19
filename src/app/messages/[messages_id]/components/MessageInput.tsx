import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSendMessageMutation } from "@/redux/features/messagesApiSlice"
import type { UserT } from "@/types"

type MessageInputProps = {
	user: UserT
	selectedUser: {
		chatId: string
		displayName: string
		avatar: string
		userId: string
	}
}

export default function MessageInput({
	user,
	selectedUser
}: MessageInputProps) {
	const [text, setText] = useState("")
	const { toast } = useToast()
	const [sendMessage] = useSendMessageMutation()

	const handleSendMessage = async () => {
		try {
			await sendMessage({
				userId: user?.uid as string,
				chatId: selectedUser.chatId,
				messagedUserId: selectedUser.userId,
				displayName: user?.displayName as string,
				avatar: user?.avatar as string,
				text: text
			})
			setText("")
		} catch (error) {
			toast({
				variant: "destructive",
				description: "Failed to send message, please try again."
			})
			console.error(error)
		}
	}

	return (
		<div className="flex items-center">
			<input
				onChange={(e) => setText(e.target.value)}
				value={text}
				type="text"
				placeholder="Type something..."
				className="w-full h-14 rounded-bl-md border-none outline-none p-3 bg-blue-950"
			/>
			<Button
				onClick={handleSendMessage}
				variant={"outline"}
				disabled={!text}
				className="h-14 rounded-none rounded-br-md border-none"
			>
				Send
			</Button>
		</div>
	)
}
