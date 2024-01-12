import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { db } from "@/config/firebase"
import {
	doc,
	updateDoc,
	arrayUnion,
	getDocs,
	getDoc,
	collection,
	setDoc,
	arrayRemove,
	collectionGroup,
	query,
	where,
	runTransaction,
	writeBatch
} from "firebase/firestore"
import type { GameT } from "@/types"

type WishlistData = {
	id: string
	owner: string
	ownerId: string
	games: GameT[]
}

export const wishlistApi = createApi({
	reducerPath: "wishlistApi",
	baseQuery: fakeBaseQuery(),
	// to allow automatic re-fetching when there is a mutation e.g. add/delete game from wishlist
	tagTypes: ["Wishlist"],
	endpoints: (builder) => ({
		fetchWishlist: builder.query({
			async queryFn(wishlistId: string) {
				try {
					const wishlistQuery = query(
						collectionGroup(db, "wishlist"),
						where("id", "==", wishlistId)
					)
					const querySnapshot = await getDocs(wishlistQuery)

					const wishlist: WishlistData = {
						id: querySnapshot.docs[0].id,
						owner: querySnapshot.docs[0].data().owner,
						ownerId: querySnapshot.docs[0].data().ownerId,
						games: querySnapshot.docs[0].data().games
					}
					return { data: wishlist }
				} catch (error) {
					return { error: "Failed to fetch wishlist." }
				}
			},
			providesTags: ["Wishlist"]
		}),
		addGameToWishlist: builder.mutation({
			async queryFn({ data, userId, owner, ownerId, wishlistId }) {
				try {
					const docRef = doc(db, "users", userId as string)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						const wishlistDocRef = doc(
							collection(docRef, "wishlist"),
							wishlistId
						)
						const collectionDocSnap = await getDoc(wishlistDocRef)

						if (!collectionDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(wishlistDocRef, {
								id: wishlistId,
								owner: owner,
								ownerId: ownerId,
								games: []
							})
						}
						await updateDoc(wishlistDocRef, {
							games: arrayUnion(data)
						})
					} else {
						console.error("Collection already exists")
					}

					return { data: "ok" }
				} catch (error) {
					return { error: error }
				}
			},
			invalidatesTags: ["Wishlist"]
		}),
		removeGameFromWishlist: builder.mutation({
			async queryFn({ data, userId, wishlistId }) {
				try {
					const wishlistDocRef = doc(
						db,
						"users",
						userId,
						"wishlist",
						wishlistId
					)
					await updateDoc(wishlistDocRef, {
						games: arrayRemove(data)
					})
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to remove game from wishlist" }
				}
			},
			invalidatesTags: ["Wishlist"]
		})
	})
})

export const {
	useFetchWishlistQuery,
	useAddGameToWishlistMutation,
	useRemoveGameFromWishlistMutation
} = wishlistApi

export default wishlistApi.reducer
