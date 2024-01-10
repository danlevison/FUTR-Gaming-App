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
			async queryFn(userId: string) {
				try {
					const userFollowersCollectionRef = collection(
						db,
						"users",
						userId,
						"followers"
					)
					const querySnapshot = await getDocs(userFollowersCollectionRef)
					const data = querySnapshot?.docs.map((doc) => doc.data())
					return { data }
				} catch (error) {
					return { error: "Failed to fetch followers" }
				}
			},
			providesTags: ["FriendsList"]
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
					const currentUserDocRef = doc(db, "users", userId)
					const currentUserDocSnap = await getDoc(currentUserDocRef)

					const followedUserDocRef = doc(db, "users", followedUserId)
					const followedUserDocSnap = await getDoc(followedUserDocRef)

					// following collection
					if (currentUserDocSnap.exists()) {
						const followingDocRef = doc(
							collection(currentUserDocRef, "following"),
							followedUserId
						)
						const followingDocSnap = await getDoc(followingDocRef)

						if (!followingDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(followingDocRef, {
								userId: followedUserId
							})
						}
					}

					// followers collection
					if (followedUserDocSnap.exists()) {
						const followersDocRef = doc(
							collection(followedUserDocRef, "followers"),
							userId
						)
						const followersDocSnap = await getDoc(followersDocRef)

						if (!followersDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(followersDocRef, {
								userId: userId
							})
						}
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
					const followersDocRef = doc(
						db,
						"users",
						followedUserId,
						"followers",
						userId
					)

					await deleteDoc(followingDocRef) // remove user from current users following list
					await deleteDoc(followersDocRef) // removes current user from the followed users followers list
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
	useFetchFollowersQuery,
	useFollowUserMutation,
	useUnfollowUserMutation
} = friendsApi

export default friendsApi.reducer
