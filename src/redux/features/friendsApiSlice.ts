import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { db } from "@/config/firebase"
import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	deleteDoc
} from "firebase/firestore"

export const friendsApi = createApi({
	reducerPath: "friendsApi",
	baseQuery: fakeBaseQuery(),
	// to allow automatic re-fetching when there is a mutation e.g. follow/unfollow a user
	tagTypes: ["FriendsList"],
	endpoints: (builder) => ({
		fetchFollowers: builder.query({
			async queryFn() {
				try {
					return { data: "ok" }
				} catch (error) {
					return { error: "Error" }
				}
			}
		}),
		fetchFollowing: builder.query({
			async queryFn(userId: string) {
				try {
					const userFollowingCollectionRef = collection(
						db,
						"users",
						userId,
						"following"
					)
					const querySnapshot = await getDocs(userFollowingCollectionRef)
					const data = querySnapshot?.docs.map((doc) => doc.data())
					return { data }
				} catch (error) {
					return { error: "Failed to fetch following users" }
				}
			},
			providesTags: ["FriendsList"]
		}),
		followUser: builder.mutation({
			async queryFn({
				userId,
				followedUserId
			}: {
				userId: string
				followedUserId: string
			}) {
				try {
					const docRef = doc(db, "users", userId)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						const collectionDocRef = doc(
							collection(docRef, "following"),
							followedUserId
						)
						const collectionDocSnap = await getDoc(collectionDocRef)

						if (!collectionDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(collectionDocRef, {
								userId: followedUserId
							})
						}
					} else {
						console.error("Collection already exists")
					}
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to follow user" }
				}
			},
			invalidatesTags: ["FriendsList"]
		}),
		unfollowUser: builder.mutation({
			async queryFn({
				userId,
				followedUserId
			}: {
				userId: string
				followedUserId: string
			}) {
				try {
					const followingDocRef = doc(
						db,
						"users",
						userId,
						"following",
						followedUserId
					)
					await deleteDoc(followingDocRef)
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to unfollow user" }
				}
			},
			invalidatesTags: ["FriendsList"]
		})
	})
})

export const {
	useFetchFollowingQuery,
	useFollowUserMutation,
	useUnfollowUserMutation
} = friendsApi

export default friendsApi.reducer
