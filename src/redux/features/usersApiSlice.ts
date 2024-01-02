import { db } from "@/config/firebase"
import { UserT } from "@/types"
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { collection, getDocs } from "firebase/firestore"
//types

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fakeBaseQuery(),
	// to allow automatic re-fetching when there is a mutation e.g. add/delete collection
	tagTypes: ["User"],
	endpoints: (builder) => ({
		fetchUsers: builder.query({
			async queryFn() {
				try {
					const userCollectionsRef = collection(db, "users")
					const querySnapshot = await getDocs(userCollectionsRef)
					let users: UserT[] = []
					querySnapshot?.forEach((doc) => {
						users.push({
							uid: doc.id,
							email: doc.data().email,
							displayName: doc.data().displayName,
							avatar: doc.data().avatar
						})
					})
					return { data: users }
				} catch (error) {
					return { error: "Failed to fetch collections" }
				}
			},
			providesTags: ["User"]
		})
	})
})

export const { useFetchUsersQuery } = usersApi

export default usersApi.reducer
