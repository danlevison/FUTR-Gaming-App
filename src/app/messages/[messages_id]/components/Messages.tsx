"use client"

import { useFetchMessagesQuery } from "@/redux/features/messagesApiSlice"
import Message from "./Message"
import MessageInput from "./MessageInput"
import type { UserT, SelectedUserT } from "@/types"

type MessagesProps = {
	user: UserT
	selectedUser: SelectedUserT
}

export default function Messages({ user, selectedUser }: MessagesProps) {
	const {
		data: messageData,
		isLoading,
		isFetching,
		isError
	} = useFetchMessagesQuery(selectedUser.chatId, {
		skip: Boolean(!selectedUser.chatId)
	})

	return (
		<div className="flex flex-col justify-between bg-foreground w-full h-full rounded-b-md">
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

			<div className="overflow-auto max-h-[700px] mt-5">
				{(isLoading || isFetching) && <p className="text-center">Loading...</p>}
				{messageData?.map((message) => (
					<Message
						key={message.id}
						user={user}
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
			{selectedUser.chatId && (
				<MessageInput
					user={user}
					selectedUser={selectedUser}
				/>
			)}
		</div>
	)
}
