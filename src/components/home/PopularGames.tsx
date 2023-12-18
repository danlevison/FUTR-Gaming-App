"use client"

import Link from "next/link"
import { useGetAllGamesQuery } from "@/redux/features/apiSlice"
import Heading from "@/components/Heading"
import Spinner from "@/components/Spinner"
import GamesList from "./GamesList"

export default function PopularGames() {
	const {
		data: gamesData,
		isLoading,
		isError
	} = useGetAllGamesQuery({
		urlEndpoint: "games/lists/greatest?&page_size=12",
		page: 1
	})

	return (
		<section className="flex flex-col items-center min-h-screen w-full mx-auto py-20 px-8">
			<div className="flex flex-col justify-center items-center">
				<Heading heading={{ firstText: "Games of the", secondText: "year" }} />
				<div className="mt-5">
					{isLoading && <Spinner />}
					{gamesData && gamesData.results?.length > 0 && (
						<>
							<GamesList games={gamesData.results} />
							<Link href={"/games"}>See more</Link>
						</>
					)}
					{isError && (
						<p className="text-3xl font-bold">Unable to load games.</p>
					)}
				</div>
			</div>
		</section>
	)
}
