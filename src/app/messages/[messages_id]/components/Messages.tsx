"use client"

import React, { useEffect } from "react"
import { useFetchMessagesQuery } from "@/redux/features/messagesApiSlice"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/config/firebase"
import type { SelectedUserT, MessageT } from "@/types"
import MessageHeader from "./MessageHeader"

type MessagesProps = {
	selectedUser: SelectedUserT
	setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Messages({ selectedUser, setShowChat }: MessagesProps) {
	const {
		data: messageData,
		isLoading,
		isFetching,
		isError,
		refetch
	} = useFetchMessagesQuery(selectedUser.chatId, {
		skip: Boolean(!selectedUser.chatId)
	})

	useEffect(() => {
		let unsubscribe: () => void

		if (selectedUser.chatId) {
			unsubscribe = onSnapshot(doc(db, "chats", selectedUser.chatId), (doc) => {
				// check if data has changed and trigger a refetch
				const newData: MessageT[] = doc.data()?.messages
				if (newData !== messageData) {
					refetch()
				}
			})
		}

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	}, [selectedUser.chatId, messageData, refetch])

	return (
		<div className="flex flex-col justify-between bg-foreground w-full h-full md:rounded-md mt-16 md:mt-0">
			<div className="fixed w-full md:static">
				<MessageHeader
					selectedUser={selectedUser}
					setShowChat={setShowChat}
				/>
			</div>

			{!selectedUser.chatId && (
				<p className="flex justify-center items-center h-full text-lg">
					Select user to start chatting!
				</p>
			)}
			{messageData && messageData.length === 0 && (
				<p className="flex justify-center items-center h-full text-lg">
					Start a conversation!
				</p>
			)}

			<div className="overflow-auto max-h-[700px] mt-16 md:mt-0">
				{(isLoading || isFetching) && <p className="text-center">Loading...</p>}
				{messageData?.map((message) => (
					<Message
						key={message.id}
						selectedUser={selectedUser}
						message={message}
					/>
				))}
				{isError && (
					<p className="text-red-500 text-center">
						Error: Unable to load messages.
					</p>
				)}
			</div>
			{selectedUser.chatId && <MessageInput selectedUser={selectedUser} />}
		</div>
	)
}
