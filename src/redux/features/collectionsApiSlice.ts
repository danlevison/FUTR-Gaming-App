import { db } from "@/config/firebase"
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
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
	arrayRemove
} from "firebase/firestore"
//types
import { GameT } from "@/types"

type CollectionsData = {
	id: string
	title: string
	description: string
	isPublic: boolean
	games: GameT[]
}

export const collectionsApi = createApi({
	reducerPath: "collectionsApi",
	baseQuery: fakeBaseQuery(),
	// to allow automatic re-fetching when there is a mutation e.g. add/delete collection
	tagTypes: ["Collection"],
	endpoints: (builder) => ({
		fetchCollections: builder.query({
			async queryFn({ userId }: { userId: string }) {
				try {
					const userCollectionsRef = collection(
						db,
						"users",
						userId,
						"collections"
					)
					const querySnapshot = await getDocs(userCollectionsRef)
					let collections: CollectionsData[] = []
					querySnapshot?.forEach((doc) => {
						collections.push({
							id: doc.id,
							title: doc.data().title,
							description: doc.data().description,
							isPublic: doc.data().isPublic,
							games: doc.data().games
						})
					})
					return { data: collections }
				} catch (error) {
					return { error: "Failed to fetch collections" }
				}
			},
			providesTags: ["Collection"]
		}),
		fetchCollection: builder.query({
			async queryFn({
				userId,
				collectionId
			}: {
				userId: string
				collectionId: string
			}) {
				try {
					const userCollectionRef = doc(
						db,
						"users",
						userId,
						"collections",
						collectionId
					)
					const collectionDocSnapshot = await getDoc(userCollectionRef)
					return { data: collectionDocSnapshot.data() }
				} catch (error) {
					return { error: "Failed to fetch collection" }
				}
			},
			providesTags: ["Collection"]
		}),
		addCollection: builder.mutation({
			async queryFn({ data, userId, collectionId }) {
				try {
					const docRef = doc(db, "users", userId as string)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						const collectionDocRef = doc(
							collection(docRef, "collections"),
							collectionId
						)
						const collectionDocSnap = await getDoc(collectionDocRef)

						if (!collectionDocSnap.exists()) {
							// If the document doesn't exist, create it with following properties.
							await setDoc(collectionDocRef, {
								id: collectionId,
								...data,
								games: []
							})
						}
					} else {
						console.error("Collection already exists")
					}
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to add new collection" }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		deleteCollection: builder.mutation({
			async queryFn({ userId, collectionId }) {
				try {
					const collectionDocRef = doc(
						db,
						"users",
						userId,
						"collections",
						collectionId
					)
					await deleteDoc(collectionDocRef)
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to delete collection" }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		addGameToCollection: builder.mutation({
			async queryFn({ data, userId, collectionId }) {
				try {
					const collectionDocRef = doc(
						db,
						"users",
						userId,
						"collections",
						collectionId
					)
					await updateDoc(collectionDocRef, {
						games: arrayUnion(data)
					})
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to add game to collection" }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		removeGameFromCollection: builder.mutation({
			async queryFn({ data, userId, collectionId }) {
				try {
					const collectionDocRef = doc(
						db,
						"users",
						userId,
						"collections",
						collectionId
					)
					await updateDoc(collectionDocRef, {
						games: arrayRemove(data)
					})
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to remove game from collection" }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		editCollection: builder.mutation({
			async queryFn({ data, userId, collectionId }) {
				try {
					const collectionDocRef = doc(
						db,
						"users",
						userId,
						"collections",
						collectionId
					)
					await updateDoc(collectionDocRef, {
						title: data.title,
						description: data.description,
						isPublic: data.isPublic
					})
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to edit collection" }
				}
			},
			invalidatesTags: ["Collection"]
		})
	})
})

export const {
	useFetchCollectionsQuery,
	useFetchCollectionQuery,
	useAddCollectionMutation,
	useDeleteCollectionMutation,
	useAddGameToCollectionMutation,
	useRemoveGameFromCollectionMutation,
	useEditCollectionMutation
} = collectionsApi

export default collectionsApi.reducer
