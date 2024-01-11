import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { db } from "@/config/firebase"
import {
	doc,
	getDoc,
	setDoc,
	collection,
	serverTimestamp,
	deleteDoc,
	updateDoc,
	arrayUnion,
	getDocs,
	arrayRemove,
	collectionGroup,
	query,
	where
} from "firebase/firestore"

export const wishlistApi = createApi({
	reducerPath: "wishlistApi",
	baseQuery: fakeBaseQuery(),
	// to allow automatic re-fetching when there is a mutation e.g. add/delete game from wishlist
	tagTypes: ["Wishlist"],
	endpoints: (builder) => ({
		fetchWishlist: builder.query({
			async queryFn({ userId }: { userId: string }) {
				try {
					const userWishlistRef = collection(db, "users", userId, "wishlist")
					const querySnapshot = await getDocs(userWishlistRef)

					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to fetch wishlist" }
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
						const wishlistDocSnap = await getDoc(wishlistDocRef)

						await updateDoc(wishlistDocRef, {
							games: arrayUnion(data)
						})

						if (!wishlistDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(wishlistDocRef, {
								id: wishlistId,
								owner: owner,
								ownerId: ownerId,
								games: []
							})
						}
					} else {
						console.error("Wishlist already exists")
					}
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to add game to wishlist" }
				}
			},
			invalidatesTags: ["Wishlist"]
		})
	})
})

export const { useFetchWishlistQuery, useAddGameToWishlistMutation } =
	wishlistApi

export default wishlistApi.reducer
