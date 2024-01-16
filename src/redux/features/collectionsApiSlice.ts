import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { db } from "@/config/firebase"
import {
	doc,
	getDoc,
	setDoc,
	collection,
	deleteDoc,
	updateDoc,
	arrayUnion,
	getDocs,
	arrayRemove,
	collectionGroup,
	query,
	where
} from "firebase/firestore"
import type { GameT } from "@/types"

type CollectionsData = {
	id: string
	title: string
	description: string
	owner: string
	ownerId: string
	isPublic: boolean
	games: GameT[]
	collectionBg: string
}

type AddCollectionData = {
	title: string
	description: string
	isPublic: boolean
}

type AddCollection = {
	data: AddCollectionData
	userId: string
	owner: string
	ownerId: string
	collectionId: string
}

export const collectionsApi = createApi({
	reducerPath: "collectionsApi",
	baseQuery: fakeBaseQuery(),
	// to allow automatic re-fetching when there is a mutation e.g. add/delete collection
	tagTypes: ["Collection"],
	endpoints: (builder) => ({
		fetchCollections: builder.query<CollectionsData[], string>({
			async queryFn(userId) {
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
							owner: doc.data().owner,
							ownerId: doc.data().ownerId,
							isPublic: doc.data().isPublic,
							games: doc.data().games,
							collectionBg: doc.data().collectionBg
						})
					})
					return { data: collections }
				} catch (error) {
					return { error: "Failed to fetch collections." }
				}
			},
			providesTags: ["Collection"]
		}),
		fetchPublicCollections: builder.query<CollectionsData[], {}>({
			async queryFn() {
				try {
					const publicCollectionsQuery = query(
						collectionGroup(db, "collections"),
						where("isPublic", "==", true)
					)
					const querySnapshot = await getDocs(publicCollectionsQuery)
					let publicCollections: CollectionsData[] = []
					querySnapshot?.forEach((doc) => {
						publicCollections.push({
							id: doc.id,
							title: doc.data().title,
							description: doc.data().description,
							owner: doc.data().owner,
							ownerId: doc.data().ownerId,
							isPublic: doc.data().isPublic,
							games: doc.data().games,
							collectionBg: doc.data().collectionBg
						})
					})
					return { data: publicCollections }
				} catch (error) {
					return { error: error }
				}
			},
			providesTags: ["Collection"]
		}),
		fetchCollection: builder.query<CollectionsData, string>({
			async queryFn(collectionId) {
				try {
					const collectionQuery = query(
						collectionGroup(db, "collections"),
						where("id", "==", collectionId)
					)
					const querySnapshot = await getDocs(collectionQuery)
					const collection: CollectionsData = {
						id: querySnapshot.docs[0].id,
						title: querySnapshot.docs[0].data().title,
						description: querySnapshot.docs[0].data().description,
						owner: querySnapshot.docs[0].data().owner,
						ownerId: querySnapshot.docs[0].data().ownerId,
						isPublic: querySnapshot.docs[0].data().isPublic,
						games: querySnapshot.docs[0].data().games,
						collectionBg: querySnapshot.docs[0].data().collectionBg
					}
					return { data: collection }
				} catch (error) {
					return { error: "Failed to fetch collection data." }
				}
			},
			providesTags: ["Collection"]
		}),
		addCollection: builder.mutation({
			async queryFn({
				data,
				userId,
				owner,
				ownerId,
				collectionId
			}: AddCollection) {
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
								owner: owner,
								ownerId: ownerId,
								...data,
								games: [],
								collectionBg: ""
							})
						}
					} else {
						console.error("Collection already exists.")
					}
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to add new collection." }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		deleteCollection: builder.mutation({
			async queryFn({
				userId,
				collectionId
			}: {
				userId: string
				collectionId: string
			}) {
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
					return { error: "Failed to delete collection." }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		addGameToCollection: builder.mutation({
			async queryFn({
				data,
				userId,
				collectionId
			}: {
				data: GameT
				userId: string
				collectionId: string
			}) {
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
					return { error: "Failed to add game to collection." }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		removeGameFromCollection: builder.mutation({
			async queryFn({
				data,
				userId,
				collectionId
			}: {
				data: GameT
				userId: string
				collectionId: string
			}) {
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
					return { error: "Failed to remove game from collection." }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		editCollection: builder.mutation({
			async queryFn({
				data,
				userId,
				collectionId
			}: {
				data: AddCollectionData
				userId: string
				collectionId: string
			}) {
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
					return { error: "Failed to edit collection." }
				}
			},
			invalidatesTags: ["Collection"]
		}),
		updateCollectionBg: builder.mutation({
			async queryFn({
				data,
				userId,
				collectionId
			}: {
				data: string
				userId: string
				collectionId: string
			}) {
				try {
					const collectionDocRef = doc(
						db,
						"users",
						userId,
						"collections",
						collectionId
					)
					await updateDoc(collectionDocRef, {
						collectionBg: data
					})
					return { data: "ok" }
				} catch (error) {
					return { error: "Failed to set collection background." }
				}
			},
			invalidatesTags: ["Collection"]
		})
	})
})

export const {
	useFetchCollectionsQuery,
	useFetchPublicCollectionsQuery,
	useFetchCollectionQuery,
	useAddCollectionMutation,
	useDeleteCollectionMutation,
	useAddGameToCollectionMutation,
	useRemoveGameFromCollectionMutation,
	useEditCollectionMutation,
	useUpdateCollectionBgMutation
} = collectionsApi

export default collectionsApi.reducer
