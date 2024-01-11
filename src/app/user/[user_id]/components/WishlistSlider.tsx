"use client"

import CollectionCard from "@/components/CollectionCard"
import GameCard from "@/components/GameCard"
import Spinner from "@/components/loading/Spinner"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel"
import { currentUser } from "@/redux/features/authSlice"
import { useFetchWishlistQuery } from "@/redux/features/wishlistApiSlice"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"

export default function CollectionsSlider() {
	const user = useSelector(currentUser)
	const { user_id } = useParams()
	const {
		data: wishlistData,
		isLoading,
		isFetching,
		isError
	} = useFetchWishlistQuery(user_id as string)

	return (
		<section className="w-full pt-10">
			<h2 className="text-xl font-bold uppercase pb-2">
				Wishlist <span>({wishlistData?.games.length})</span>
			</h2>
			{wishlistData?.games.length === 0 ? (
				<p className="mt-20 text-xl text-center">No collections yet.</p>
			) : (
				<Carousel
					opts={{
						align: "start",
						loop: true
					}}
				>
					{isLoading || isFetching ? (
						<div className="flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<div>
							<CarouselContent>
								{wishlistData?.games?.map((game) => (
									<CarouselItem
										key={game.id}
										className="sm:basis-1/2 md:basis-1/2 xl:basis-1/3"
									>
										<GameCard game={game} />
									</CarouselItem>
								))}
								{/* TODO: Check styling */}
								{isError && <p>Unable to load wishlist.</p>}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</div>
					)}
				</Carousel>
			)}
		</section>
	)
}
