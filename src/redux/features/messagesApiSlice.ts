import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	Timestamp,
	updateDoc,
	arrayUnion,
	where,
	query,
	deleteDoc
} from "firebase/firestore"
import { db } from "@/config/firebase"
import { v4 as uuid } from "uuid"
import type { ChatsDataT } from "@/types"

type AddUserToChat = {
	userId: string
	messagedUserId: string
	displayName: string
	avatar: string
}

type SendMessage = {
	userId: string
	chatId: string
	messagedUserId: string
	displayName: string
	avatar: string
	text: string
}

type Message = {
	id: string
	date: string
	senderId: string
	text: string
}

export const messagesApi = createApi({
	reducerPath: "messagesApi",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Messages"],
	endpoints: (builder) => ({
		fetchChats: builder.query<ChatsDataT[], string>({
			async queryFn(userId) {
				try {
					const chatsCollectionRef = collection(
						db,
						"users",
						userId,
						"userChats"
					)
					const querySnapshot = await getDocs(chatsCollectionRef)
					const data = querySnapshot?.docs.map((doc) =>
						doc.data()
					) as ChatsDataT[]
					return { data }
				} catch (error) {
					return { error: "Error: Unable to load chats." }
				}
			},
			providesTags: ["Messages"]
		}),
		fetchMessages: builder.query<Message[], string>({
			async queryFn(chatId) {
				try {
					const chatDocRef = doc(db, "chats", chatId)
					const chatDocSnap = await getDoc(chatDocRef)
					const data = chatDocSnap.data()?.messages as Message[]
					return { data }
				} catch (error) {
					return { error: "Failed to retrieve messages." }
				}
			},
			providesTags: ["Messages"]
		}),
		searchUsers: builder.query<
			ChatsDataT[],
			{ userId: string; username: string }
		>({
			async queryFn({ userId, username }) {
				try {
					const userChatsRef = collection(db, "users", userId, "userChats")
					const userSearchQuery = query(
						userChatsRef,
						where("userInfo.displayName", "==", username)
					)

					const querySnapshot = await getDocs(userSearchQuery)
					const data = querySnapshot.docs.map((doc) =>
						doc.data()
					) as ChatsDataT[]
					return { data }
				} catch (error) {
					return { error: "No users found." }
				}
			}
		}),
		addUserToChat: builder.mutation({
			async queryFn({
				userId,
				messagedUserId,
				displayName,
				avatar
			}: AddUserToChat) {
				try {
					const currentUserDocRef = doc(db, "users", userId)
					const currentUserDocSnap = await getDoc(currentUserDocRef)
					const combinedId =
						userId > messagedUserId
							? userId + messagedUserId
							: messagedUserId + userId

					// create parent chats collection if it doesn't exist
					await setDoc(doc(db, "chats", combinedId), { messages: [] })

					if (currentUserDocSnap.exists()) {
						const chatsDocRef = doc(
							collection(currentUserDocRef, "userChats"),
							combinedId
						)
						const chatsDocSnap = await getDoc(chatsDocRef)

						if (!chatsDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(chatsDocRef, {
								chatId: combinedId,
								date: new Date(Timestamp.now().seconds * 1000).toString(),
								userInfo: {
									displayName: displayName,
									avatar: avatar,
									userId: messagedUserId
								},
								latestMessage: ""
							})
						}
					}
					return { data: "ok" }
				} catch (error) {
					return { error: "Unable to start chat" }
				}
			},
			invalidatesTags: ["Messages"]
		}),
		sendMessage: builder.mutation({
			async queryFn({
				userId,
				chatId,
				messagedUserId,
				displayName,
				avatar,
				text
			}: SendMessage) {
				try {
					const currentUserDocRef = doc(db, "users", userId)
					const userChatsDocRef = doc(
						collection(currentUserDocRef, "userChats"),
						chatId
					)

					const messagedUserDocRef = doc(db, "users", messagedUserId)
					const messagedUserDocSnap = await getDoc(messagedUserDocRef)

					await updateDoc(doc(db, "chats", chatId), {
						messages: arrayUnion({
							id: uuid(),
							text,
							senderId: userId,
							date: new Date(Timestamp.now().seconds * 1000).toString()
						})
					})

					// update latest message/date for current user
					await updateDoc(userChatsDocRef, {
						date: new Date(Timestamp.now().seconds * 1000).toString(),
						latestMessage: text
					})

					// set chats collection for messaged user if it doesn't exists yet
					if (messagedUserDocSnap.exists()) {
						const messagedUserChatsDocRef = doc(
							collection(messagedUserDocRef, "userChats"),
							chatId
						)
						const chatsDocSnap = await getDoc(messagedUserChatsDocRef)

						if (!chatsDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(messagedUserChatsDocRef, {
								chatId: chatId,
								date: new Date(Timestamp.now().seconds * 1000).toString(),
								userInfo: {
									displayName: displayName,
									avatar: avatar,
									userId: userId
								},
								latestMessage: text
							})
						} else {
							// if it does exists just update date and latest message for messaged user
							await updateDoc(messagedUserChatsDocRef, {
								date: new Date(Timestamp.now().seconds * 1000).toString(),
								latestMessage: text
							})
						}
					}
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to send message." }
				}
			},
			invalidatesTags: ["Messages"]
		})
	})
})

export const {
	useFetchChatsQuery,
	useFetchMessagesQuery,
	useSearchUsersQuery,
	useAddUserToChatMutation,
	useSendMessageMutation
} = messagesApi

export default messagesApi.reducer
