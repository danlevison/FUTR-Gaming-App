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
  where,
  increment,
} from "firebase/firestore"
import type { GameT, CollectionsData } from "@/types"

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

type FollowingCollectionIds = {
  collectionId: string
  ownerId: string
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
              followers: doc.data().followers,
              games: doc.data().games,
              collectionBg: doc.data().collectionBg,
            })
          })
          return { data: collections }
        } catch (error) {
          return { error: "Failed to fetch collections." }
        }
      },
      providesTags: ["Collection"],
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
              followers: doc.data().followers,
              games: doc.data().games,
              collectionBg: doc.data().collectionBg,
            })
          })
          return { data: publicCollections }
        } catch (error) {
          return { error: "Failed to fetch collections." }
        }
      },
      providesTags: ["Collection"],
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
            followers: querySnapshot.docs[0].data().followers,
            games: querySnapshot.docs[0].data().games,
            collectionBg: querySnapshot.docs[0].data().collectionBg,
          }
          return { data: collection }
        } catch (error) {
          return { error: "Failed to fetch collection data." }
        }
      },
      providesTags: ["Collection"],
    }),
    fetchFollowingCollectionIds: builder.query<
      FollowingCollectionIds[],
      string
    >({
      async queryFn(userId) {
        try {
          const followingCollectionRef = collection(
            db,
            "users",
            userId,
            "followingCollections"
          )
          const querySnapshot = await getDocs(followingCollectionRef)
          const data = querySnapshot?.docs.map((doc) => {
            return doc.data() as FollowingCollectionIds
          })

          return { data }
        } catch (error) {
          return { error: "Failed to fetch following collection data." }
        }
      },
      providesTags: ["Collection"],
    }),
    fetchFollowingCollections: builder.query<CollectionsData[], string[]>({
      async queryFn(collectionIds) {
        try {
          const collectionQuery = query(
            collectionGroup(db, "collections"),
            where("id", "in", collectionIds)
          )
          const querySnapshot = await getDocs(collectionQuery)

          const collections: CollectionsData[] = querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              owner: doc.data().owner,
              ownerId: doc.data().ownerId,
              isPublic: doc.data().isPublic,
              followers: doc.data().followers,
              games: doc.data().games,
              collectionBg: doc.data().collectionBg,
            })
          )

          return { data: collections }
        } catch (error) {
          return { error: "Failed to fetch collection data." }
        }
      },
      providesTags: ["Collection"],
    }),
    addCollection: builder.mutation({
      async queryFn({
        data,
        userId,
        owner,
        ownerId,
        collectionId,
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
                followers: 0,
                ...data,
                games: [],
                collectionBg: "",
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
      invalidatesTags: ["Collection"],
    }),
    deleteCollection: builder.mutation({
      async queryFn({
        userId,
        collectionId,
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
      invalidatesTags: ["Collection"],
    }),
    addGameToCollection: builder.mutation({
      async queryFn({
        data,
        userId,
        collectionId,
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
            games: arrayUnion(data),
          })
          return { data: "ok" }
        } catch (error) {
          return { error: "Failed to add game to collection." }
        }
      },
      invalidatesTags: ["Collection"],
    }),
    removeGameFromCollection: builder.mutation({
      async queryFn({
        data,
        userId,
        collectionId,
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
            games: arrayRemove(data),
          })
          return { data: "ok" }
        } catch (error) {
          return { error: "Failed to remove game from collection." }
        }
      },
      invalidatesTags: ["Collection"],
    }),
    editCollection: builder.mutation({
      async queryFn({
        data,
        userId,
        collectionId,
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
            isPublic: data.isPublic,
          })
          return { data: "ok" }
        } catch (error) {
          return { error: "Failed to edit collection." }
        }
      },
      invalidatesTags: ["Collection"],
    }),
    updateCollectionBg: builder.mutation({
      async queryFn({
        data,
        userId,
        collectionId,
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
            collectionBg: data,
          })
          return { data: "ok" }
        } catch (error) {
          return { error: "Failed to set collection background." }
        }
      },
      invalidatesTags: ["Collection"],
    }),
    followUserCollection: builder.mutation({
      async queryFn({
        userId,
        collectionId,
        ownerId,
      }: {
        userId: string
        collectionId: string
        ownerId: string
      }) {
        try {
          const docRef = doc(db, "users", userId as string)
          const docSnap = await getDoc(docRef)
          const ownerCollectionDocRef = doc(
            db,
            "users",
            ownerId,
            "collections",
            collectionId
          )

          if (docSnap.exists()) {
            const followingCollectionsDocRef = doc(
              collection(docRef, "followingCollections"),
              collectionId
            )
            const followingCollectionDocSnap = await getDoc(
              followingCollectionsDocRef
            )

            if (!followingCollectionDocSnap.exists()) {
              // If the document doesn't exist, create it with following properties.
              await setDoc(followingCollectionsDocRef, {
                collectionId,
                ownerId,
              })
            }
            await updateDoc(ownerCollectionDocRef, {
              followers: increment(1),
            })
          } else {
            console.error("Collection already exists.")
          }

          return { data: "ok" }
        } catch (error) {
          return { error: "Failed to follow collection." }
        }
      },
      invalidatesTags: ["Collection"],
    }),
    unfollowUserCollection: builder.mutation({
      async queryFn({
        userId,
        ownerId,
        collectionId,
      }: {
        userId: string
        ownerId: string
        collectionId: string
      }) {
        try {
          const followingDocRef = doc(
            db,
            "users",
            userId,
            "followingCollections",
            collectionId
          )

          const ownerCollectionDocRef = doc(
            db,
            "users",
            ownerId,
            "collections",
            collectionId
          )

          await deleteDoc(followingDocRef)
          await updateDoc(ownerCollectionDocRef, {
            followers: increment(-1),
          })

          return { data: "ok" }
        } catch (error) {
          return { error: "Failed to unfollow collection." }
        }
      },
      invalidatesTags: ["Collection"],
    }),
  }),
})

export const {
  useFetchCollectionsQuery,
  useFetchPublicCollectionsQuery,
  useFetchCollectionQuery,
  useFetchFollowingCollectionIdsQuery,
  useFetchFollowingCollectionsQuery,
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  useAddGameToCollectionMutation,
  useRemoveGameFromCollectionMutation,
  useEditCollectionMutation,
  useUpdateCollectionBgMutation,
  useFollowUserCollectionMutation,
  useUnfollowUserCollectionMutation,
} = collectionsApi

export default collectionsApi.reducer
