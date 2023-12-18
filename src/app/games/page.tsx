"use client"

import { useGetAllGamesQuery } from "@/redux/features/apiSlice"
import { useState } from "react"
import Heading from "@/components/Heading"
import Spinner from "@/components/Spinner"
import GamesList from "@/components/home/GamesList"
import GameCategoryMenu from "./components/GameCategoryMenu"
import Pagination from "@/components/Pagnination"

export default function Games() {
	const endPoints = [
		{
			name: "All Games",
			path: "games?page_size=40"
		},
		{
			name: "Best of the Year",
			path: "games/lists/greatest?&page_size=40"
		},
		{
			name: "All Time Top 250",
			path: "games/lists/popular?page_size=40"
		}
	]

	const [categoryIndex, setCategoryIndex] = useState(0)
	const [page, setPage] = useState(1)
	const {
		data: allGamesData,
		isLoading,
		isError
	} = useGetAllGamesQuery({
		urlEndpoint: endPoints[categoryIndex].path,
		page
	})

	const handleGameCategory = (index: number) => {
		setCategoryIndex(index)
		setPage(1)
	}

	const pageHandler = (pageValue: number) => {
		setPage(pageValue)
	}

	return (
		<section className="flex flex-col items-center min-h-screen w-full mx-auto px-8 py-28">
			<Heading heading={{ firstText: "All", secondText: "Games" }} />
			<GameCategoryMenu
				endPoints={endPoints}
				categoryIndex={categoryIndex}
				handleGameCategory={handleGameCategory}
			/>
			<div className="flex flex-col items-center mt-5">
				{isLoading && <Spinner />}
				{allGamesData && allGamesData.results?.length > 0 && (
					<>
						<GamesList games={allGamesData.results} />
						<Pagination
							pageHandler={pageHandler}
							nextPage={allGamesData.next}
							prevPage={allGamesData.previous}
							currentPage={page}
						/>
					</>
				)}
				{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
			</div>
		</section>
	)
}
