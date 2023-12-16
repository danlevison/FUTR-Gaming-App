"use client"

import { useState, useEffect } from "react"
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
import Pagination from "@/components/Pagnination"
//types
import { AppDispatch } from "@/redux/store"

export default function Games() {
	const dispatch = useDispatch<AppDispatch>()
	const allGames = useSelector(games)
	const allGamesStatus = useSelector(gamesStatus)
	const nextPage = useSelector(gamesNextPage)
	const prevPage = useSelector(gamesPrevPage)
	const [page, setPage] = useState(1)

	useEffect(() => {
		dispatch(fetchGames(page))
	}, [dispatch, page])

	const pageHandler = (pageValue: number) => {
		setPage(pageValue)
	}

	return (
		<section className="flex flex-col items-center min-h-screen w-full max-w-[1240px] mx-auto px-8 py-28">
			<Heading heading={{ firstText: "All", secondText: "Games" }} />
			{allGamesStatus === STATUS.LOADING ? (
				<div className="mt-10">
					<Spinner />
				</div>
			) : allGames && allGames?.length > 0 ? (
				<>
					<GamesList
						games={allGames}
						sliceValue={9}
					/>
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
