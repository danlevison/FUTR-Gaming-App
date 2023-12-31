"use client"

import { useGetGameQuery } from "@/redux/features/gamesApiSlice"
import { useParams } from "next/navigation"
import GameBanner from "@/components/GameBanner"
import Screenshots from "./components/Screenshots"
import Details from "./components/Details"
import Series from "./components/Series"
import RatingBar from "./components/RatingBar"
import SkeletonGameDetailsPage from "@/components/skeletons/SkeletonGameDetailsPage"
import Collections from "./components/Collections"

export default function GameDetails() {
	const { game_id } = useParams()
	const {
		data: gameData,
		isSuccess,
		isLoading,
		isFetching,
		isError
	} = useGetGameQuery({ id: game_id as string })

	return (
		<main className="flex flex-col min-h-screen w-full px-5 pt-20 pb-10 md:pt-2">
			{isLoading || isFetching ? (
				<SkeletonGameDetailsPage />
			) : isError ? (
				<p>Error loading data</p>
			) : (
				isSuccess && (
					<>
						<GameBanner gameData={gameData} />
						<Collections gameData={gameData} />
						<Screenshots gameData={gameData} />
						<RatingBar gameData={gameData} />
						<Details gameData={gameData} />
						<Series gameData={gameData} />
					</>
				)
			)}
		</main>
	)
}
