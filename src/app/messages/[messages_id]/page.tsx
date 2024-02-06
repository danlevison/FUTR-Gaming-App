"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Chats from "./components/Chats"
import Messages from "./components/Messages"
import useUser from "@/hooks/useUser"

export default function UserMessages() {
	const user = useUser()
	const [showChat, setShowChat] = useState(false)
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
		<main className="flex flex-col md:flex-row gap-5 w-full min-h-screen md:px-5 md:pb-1 md:pt-2 md:min-h-[calc(100vh_-_4rem)]">
			<div
				className={`${showChat ? "flex" : "hidden"} md:flex flex-col w-full`}
			>
				<Messages
					selectedUser={selectedUser}
					setShowChat={setShowChat}
				/>
			</div>

			<div
				className={`${
					!showChat ? "flex" : "hidden"
				} md:flex w-full md:max-w-[250px] lg:max-w-[400px] overflow-auto`}
			>
				<Chats
					setShowChat={setShowChat}
					selectedUserChatId={selectedUser.chatId}
					setSelectedUser={setSelectedUser}
				/>
			</div>
		</main>
	)
}
