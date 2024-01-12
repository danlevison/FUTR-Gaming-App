"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import { useFetchWishlistQuery } from "@/redux/features/wishlistApiSlice"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"
import LoadingGames from "@/components/loading/LoadingGames"
import GamesList from "@/components/GamesList"

export default function WishListGames() {
	const user = useSelector(currentUser)
	const { wishlist_id } = useParams()
	const {
		data: wishlistData,
		isLoading,
		isFetching,
		isError
	} = useFetchWishlistQuery(wishlist_id as string)
	const { data: userData } = useFetchUsersQuery({})

	const userDetails = () => {
		return userData?.find((user) => user?.uid === wishlist_id)
	}

	const { displayName } = userDetails() || {}

	return (
		<>
			{displayName && (
				<h2 className="text-2xl sm:text-3xl mb-2">
					{user?.uid === wishlist_id ? (
						"Your"
					) : (
						<Link
							href={`/user/${wishlist_id}`}
							className="underline"
						>
							{displayName}&apos;s
						</Link>
					)}{" "}
					Wishlist
				</h2>
			)}
			<div className="flex flex-col items-center mt-5">
				{(isLoading || isFetching) && <LoadingGames />}

				{wishlistData && wishlistData.games?.length > 0 && (
					<>
						<GamesList
							games={wishlistData.games}
							ownerId={wishlistData.ownerId}
						/>
					</>
				)}

				{isError && <p className="text-3xl font-bold">Wishlist is empty.</p>}
			</div>
		</>
	)
}
