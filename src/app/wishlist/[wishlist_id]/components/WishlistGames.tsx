import Link from "next/link"
import { useParams } from "next/navigation"
import { useFetchWishlistQuery } from "@/redux/features/wishlistApiSlice"
import LoadingGames from "@/components/loading/LoadingGames"
import GamesList from "@/components/GamesList"
import type { UserT } from "@/types"

export default function WishListGames({ user }: { user: UserT }) {
	const { wishlist_id } = useParams()
	const {
		data: wishlistData,
		isLoading,
		isFetching,
		isError
	} = useFetchWishlistQuery(wishlist_id as string)

	return wishlistData ? (
		<div>
			<h2 className="text-2xl sm:text-3xl mb-2">
				{user?.uid === wishlist_id ? (
					"Your"
				) : (
					<Link
						href={`/user/${wishlist_id}`}
						className="underline"
					>
						{wishlistData?.owner}&apos;s
					</Link>
				)}{" "}
				Wishlist
			</h2>
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

				{isError && (
					<p className="text-3xl font-bold">Unable to load wishlist.</p>
				)}
			</div>
		</div>
	) : (
		<p className="text-2xl text-center">Wishlist is empty.</p>
	)
}
