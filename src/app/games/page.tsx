"use client"

import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { STATUS } from "@/utils/status"
import {
	games,
	gamesStatus,
	gamesNextPage,
	gamesPrevPage
} from "@/redux/features/gameSlice"
import { fetchGames } from "@/redux/utils/gameUtils"
import Heading from "@/components/Heading"
import Spinner from "@/components/Spinner"
import GamesList from "@/components/home/GamesList"
import GameCategoryMenu from "./components/GameCategoryMenu"
import Pagination from "@/components/Pagnination"
//types
import { AppDispatch } from "@/redux/store"

export default function Games() {
	const dispatch = useDispatch<AppDispatch>()
	const allGames = useSelector(games)
	const allGamesStatus = useSelector(gamesStatus)
	const [categoryIndex, setCategoryIndex] = useState(0)
	const [page, setPage] = useState(1)
	const nextPage = useSelector(gamesNextPage)
	const prevPage = useSelector(gamesPrevPage)

	const endPoints = useMemo(
		() => [
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
		],
		[]
	)

	useEffect(() => {
		dispatch(fetchGames({ urlEndpoint: endPoints[categoryIndex].path, page }))
	}, [dispatch, endPoints, categoryIndex, page])

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
			{allGamesStatus === STATUS.LOADING ? (
				<div className="mt-10">
					<Spinner />
				</div>
			) : allGames && allGames?.length > 0 ? (
				<>
					<GamesList games={allGames} />
					<Pagination
						pageHandler={pageHandler}
						nextPage={nextPage}
						prevPage={prevPage}
						currentPage={page}
					/>
				</>
			) : (
				<p className="text-3xl font-bold mt-10">Unable to load games!</p>
			)}
		</section>
	)
}
