"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Chats from "./components/Chats"
import Messages from "./components/Messages"
import Link from "next/link"
import Image from "next/image"
import useUser from "@/hooks/useUser"

export default function UserMessages() {
	const user = useUser()
	const [selectedUser, setSelectedUser] = useState({
		chatId: "",
		displayName: "",
		avatar: "",
		userId: ""
	})
	const { push } = useRouter()

	useEffect(() => {
		if (!user) {
			push("/messages")
		}
	})

	return (
		<main className="flex flex-col-reverse md:flex-row gap-5 w-full mx-auto px-5 pt-20 pb-5 md:pb-1 md:pt-2 md:min-h-[calc(100vh_-_4rem)]">
			<div className="flex flex-col w-full">
				<div className="flex items-center bg-blue-950 h-14 p-3 rounded-t-md">
					{selectedUser.displayName && (
						<Link
							href={`/user/${selectedUser.userId}`}
							className="flex items-center gap-2 hover:underline"
						>
							<Image
								src={selectedUser.avatar}
								alt={selectedUser.displayName}
								width={30}
								height={30}
								className="rounded-full"
							/>
							{selectedUser.displayName}
						</Link>
					)}
				</div>

				<Messages selectedUser={selectedUser} />
			</div>
			<Chats
				selectedUserChatId={selectedUser.chatId}
				setSelectedUser={setSelectedUser}
			/>
		</main>
	)
}
