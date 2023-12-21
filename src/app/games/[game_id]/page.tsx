"use client"

import { useGetGameQuery } from "@/redux/features/apiSlice"
import { useParams } from "next/navigation"
import Banner from "@/components/Banner"
import Screenshots from "./components/Screenshots"
import Details from "./components/Details"
import Series from "./components/Series"
import RatingBar from "./components/RatingBar"
import SkeletonGameDetailsPage from "@/components/SkeletonGameDetailsPage"

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
		<main className="flex flex-col min-h-screen w-full px-5 py-20">
			{isLoading || isFetching ? (
				<SkeletonGameDetailsPage />
			) : isError ? (
				<p>Error loading data</p>
			) : (
				isSuccess && (
					<>
						<Banner gameData={gameData} />
						<Screenshots gameData={gameData} />
						<RatingBar gameData={gameData} />
						<Details gameData={gameData} />
						<Series gameData={gameData} />
					</>
				)
			)}
			{/* <SkeletonGameDetailsPage /> */}
		</main>
	)
}
