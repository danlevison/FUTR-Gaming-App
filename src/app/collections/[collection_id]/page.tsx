"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { currentUser } from "@/redux/features/authSlice"
import { useFetchCollectionQuery } from "@/redux/features/collectionsApiSlice"
import { useSelector } from "react-redux"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import GamesList from "@/components/GamesList"
import PrivateRoute from "@/components/PrivateRoute"
import { userProfileId } from "@/redux/features/userProfileIdSlice"

function Collection() {
	const { collection_id } = useParams()
	const viewedUserProfileId = useSelector(userProfileId)
	console.log(viewedUserProfileId)
	const user = useSelector(currentUser)
	const {
		data: collectionData,
		isLoading,
		isFetching,
		isError
	} = useFetchCollectionQuery({
		userId: viewedUserProfileId?.userId ?? "",
		collectionId: collection_id as string
	})

	return (
		<main className="relative min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			{collectionData?.collectionBg && (
				<>
					<Image
						alt=""
						src={collectionData?.collectionBg}
						quality={100}
						fill
						sizes="100vw"
						priority
						style={{
							objectFit: "cover"
						}}
						className="z-0"
					/>
					<div className="absolute inset-0 bg-black/80" />
				</>
			)}
			<div className="relative z-10">
				<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
					{collectionData?.title}
				</h1>
				<div className="mt-2">
					<p>Collection by: {user?.displayName}</p>
					{collectionData?.isPublic ? (
						<p className="flex items-center gap-2">
							Public Collection <MdVisibility />
						</p>
					) : (
						<p className="flex items-center gap-2">
							Private Collection <MdVisibilityOff />
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
			</div>
		</main>
	)
}

export default Collection
