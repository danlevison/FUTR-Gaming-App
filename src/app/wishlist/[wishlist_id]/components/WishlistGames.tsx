import { useParams } from "next/navigation"
import { useFetchWishlistQuery } from "@/redux/features/wishlistApiSlice"
import LoadingGames from "@/components/loading/LoadingGames"
import GamesList from "@/components/GamesList"
import type { UserT } from "@/types"

export default function WishListGames({ user }: { user: UserT }) {
	const { wishlist_id } = useParams()
	const {
		data: wishlistGamesData,
		isLoading,
		isFetching,
		isError
	} = useFetchWishlistQuery(wishlist_id as string)

	return (
		<div>
			<h2 className="text-2xl sm:text-3xl mb-2">
				{user?.uid === wishlist_id
					? "Your Wishlist"
					: `${wishlistGamesData?.owner}'s Wishlist`}
			</h2>
			<div className="flex flex-col items-center mt-5">
				{(isLoading || isFetching) && <LoadingGames />}

				{wishlistGamesData && wishlistGamesData.games?.length > 0 && (
					<>
						<GamesList
							games={wishlistGamesData.games}
							ownerId={wishlistGamesData.ownerId}
						/>
					</>
				)}

				{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
			</div>
		</div>
	)
}
