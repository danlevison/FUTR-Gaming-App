"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FaEnvelope } from "react-icons/fa"
import { useAddUserToChatMutation } from "@/redux/features/messagesApiSlice"
import { useToast } from "@/components/ui/use-toast"
import useUser from "@/hooks/useUser"

type MessageLinkProps = {
	userParamId: string | string[]
	displayName: string | undefined
	avatar: string | undefined
}
export default function MessageBtn({
	userParamId,
	displayName,
	avatar
}: MessageLinkProps) {
	const user = useUser()
	const { push } = useRouter()
	const [addUserToChat] = useAddUserToChatMutation()
	const { toast } = useToast()

	const handleClick = async () => {
		try {
			await addUserToChat({
				userId: user?.uid as string,
				messagedUserId: userParamId as string,
				displayName: displayName as string,
				avatar: avatar as string
			})
			push(`/messages/${user?.uid}`)
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description: "Failed to message user, please try again."
			})
		}
	}
	return (
		user?.uid !== userParamId && (
			<Button
				onClick={handleClick}
				variant={"outline"}
				className="flex items-center gap-2 w-full xs:max-w-[140px] mx-auto xs:mx-0"
			>
				Message
				<FaEnvelope size={20} />
			</Button>
		)
	)
}
