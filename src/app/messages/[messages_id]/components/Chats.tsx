"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import SearchUser from "./SearchUser"
import { useFetchChatsQuery } from "@/redux/features/messagesApiSlice"
import { useSearchUsersQuery } from "@/redux/features/messagesApiSlice"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "@/config/firebase"
import type { ChatsDataT, SelectedUserT, UserT } from "@/types"

type ChatsProps = {
	user: UserT
	selectedUserChatId: string
	setSelectedUser: React.Dispatch<React.SetStateAction<SelectedUserT>>
}

type UserInfoT = {
	displayName: string
	avatar: string
	userId: string
}

export default function Chats({
	user,
	selectedUserChatId,
	setSelectedUser
}: ChatsProps) {
	const [username, setUsername] = useState("")
	const {
		data: chatsData,
		isLoading,
		isFetching,
		isError,
		refetch
	} = useFetchChatsQuery(user?.uid as string)
	const { data: userSearchData } = useSearchUsersQuery({
		userId: user?.uid as string,
		username: username
	})

	useEffect(() => {
		let unsubscribe: () => void

		if (user?.uid && selectedUserChatId) {
			unsubscribe = onSnapshot(
				doc(db, "users", user.uid, "userChats", selectedUserChatId),
				(doc) => {
					// check if data has changed and trigger a refetch
					const newData: string | string[] = doc.data()?.latestMessage
					if (newData !== chatsData?.map((data) => data.latestMessage)) {
						refetch()
					}
				}
			)
		}

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	}, [user?.uid, chatsData, refetch, selectedUserChatId])

	const handleLoadMessages = (chatId: string, userInfo: UserInfoT) => {
		setSelectedUser({ chatId, ...userInfo })
	}

	return (
		<aside className="bg-foreground w-full md:max-w-[250px] lg:max-w-[400px] rounded-md overflow-auto">
			<SearchUser
				username={username}
				setUsername={setUsername}
			/>

			{/* search results */}
			<ul className="flex flex-col">
				{userSearchData?.map(({ chatId, userInfo }) => (
					<li
						key={userInfo.userId}
						className="hover:bg-background duration-300 border-b border-b-gray-500"
					>
						<button
							onClick={() => handleLoadMessages(chatId, userInfo)}
							className="flex items-center gap-3 w-full h-full px-2 py-4"
						>
							<Image
								src={userInfo.avatar}
								alt={userInfo.displayName}
								width={50}
								height={50}
								className="rounded-full"
							/>
							<span className="flex flex-col items-start">
								<p className="font-bold">{userInfo.displayName}</p>
							</span>
						</button>
					</li>
				))}
			</ul>

			{/* chats */}
			<ul className="flex flex-col justify-center">
				{(isLoading || isFetching) && <p>Loading...</p>}
				{chatsData
					?.toSorted(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
					)
					.map(({ chatId, userInfo, latestMessage }) => (
						<li
							key={chatId}
							className={`${
								chatId === selectedUserChatId
									? "bg-background"
									: "bg-transparent"
							} hover:bg-background duration-300`}
						>
							<button
								onClick={() => handleLoadMessages(chatId, userInfo)}
								className="flex items-center gap-3 w-full h-full px-2 py-4"
							>
								<Image
									src={userInfo.avatar}
									alt={userInfo.displayName}
									width={50}
									height={50}
									className="rounded-full"
								/>
								<span className="flex flex-col items-start">
									<p className="font-bold">{userInfo.displayName}</p>
									<p className="text-start text-gray-500">
										{latestMessage.length > 79
											? latestMessage.slice(0, 80) + "..."
											: latestMessage}
									</p>
								</span>
							</button>
						</li>
					))}
			</ul>
			{isError && <p className="text-red-500">Error: Unable to load chats.</p>}
		</aside>
	)
}
