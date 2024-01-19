import { useEffect, useRef } from "react"
import Image from "next/image"
import type { UserT, SelectedUserT } from "@/types"

type MessageProps = {
	user: UserT
	selectedUser: SelectedUserT
	message: {
		id: string
		date: string
		senderId: string
		text: string
	}
}

export default function Message({ user, selectedUser, message }: MessageProps) {
	const ref = useRef<HTMLDivElement | null>(null)

	const getMessageSendTime = () => {
		const dateString = message.date
		const dateObj = new Date(dateString)

		const hours = dateObj.getHours()
		const minutes = dateObj.getMinutes()
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

		return `${hours}:${formattedMinutes}`
	}

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "auto" })
	}, [message])

	return (
		<div
			ref={ref}
			className={`flex gap-5 mb-5 p-3 ${
				message.senderId === user?.uid ? "flex-row-reverse" : ""
			}`}
		>
			<div className="flex flex-col">
				<Image
					src={
						message.senderId === user?.uid ? user.avatar : selectedUser.avatar
					}
					alt={
						message.senderId === user?.uid
							? user.displayName
							: selectedUser.displayName
					}
					width={40}
					height={40}
					style={{ "objectFit": "cover" }}
					className="rounded-full"
				/>
				<span className="text-gray-500">{getMessageSendTime()}</span>
			</div>
			<div className="flex flex-col items-end max-w-[80%]">
				<p
					className={`p-2 max-w-max ${
						message.senderId === user?.uid
							? "bg-blue-400 text-white rounded-l-lg rounded-br-lg"
							: "text-black bg-white rounded-r-lg rounded-bl-lg"
					}`}
				>
					{message.text}
				</p>
			</div>
		</div>
	)
}
