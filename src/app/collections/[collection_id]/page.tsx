"use client"

import { useParams } from "next/navigation"
import { currentUser } from "@/redux/features/authSlice"
import { useFetchCollectionQuery } from "@/redux/features/collectionsApiSlice"
import { useSelector } from "react-redux"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import GamesList from "@/components/GamesList"
import PrivateRoute from "@/components/PrivateRoute"

function Collection() {
	const { collection_id } = useParams()
	const user = useSelector(currentUser)
	const {
		data: collectionData,
		isLoading,
		isFetching,
		isError
	} = useFetchCollectionQuery({
		userId: user?.uid,
		collectionId: collection_id
	})

	return (
		<main className="min-h-screen w-full mx-auto px-5 py-20">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				{collectionData?.title}
			</h1>
			<div className="mt-2">
				<p>Collection by: {user?.displayName}</p>
				{collectionData?.isPublic ? (
					<p className="flex items-center gap-2">
						Private Collection <MdVisibilityOff />
					</p>
				) : (
					<p className="flex items-center gap-2">
						Public Collection <MdVisibility />
					</p>
				)}
			</div>
			<div className="flex flex-col items-center mt-5">
				{collectionData && collectionData.games?.length > 0 && (
					<GamesList games={collectionData.games} />
				)}

				{isError && (
					<p className="text-3xl font-bold">Unable to load collection.</p>
				)}
			</div>
		</main>
	)
}

export default PrivateRoute(Collection)
