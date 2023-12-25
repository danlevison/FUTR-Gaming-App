"use client"

import Link from "next/link"
import { useGetAllGamesQuery } from "@/redux/features/gamesApiSlice"
import Heading from "@/components/Heading"
import GamesList from "../GamesList"
import LoadingGames from "../loading/LoadingGames"

export default function PopularGames() {
	const {
		data: gamesData,
		isLoading,
		isFetching,
		isError
	} = useGetAllGamesQuery({
		urlEndpoint: "games/lists/greatest?&page_size=12",
		option: "relevance",
		page: 1
	})

	return (
		<section className="flex flex-col items-center min-h-screen w-full py-14 px-5">
			<Heading heading={{ firstText: "Games of the", secondText: "year" }} />
			<div className="mt-7 w-full">
				{(isLoading || isFetching) && <LoadingGames />}
				{gamesData && gamesData.results?.length > 0 && (
					<div className="flex flex-col items-center gap-10">
						<GamesList games={gamesData.results} />
						<Link
							href={"/games"}
							className="w-full max-w-[170px] bg-transparent text-center uppercase border-accentPrimary border-2 rounded-md p-2"
						>
							See more
						</Link>
					</div>
				)}
				{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
			</div>
		</section>
	)
}
