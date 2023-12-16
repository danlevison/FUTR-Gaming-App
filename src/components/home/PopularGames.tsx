"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGames } from "@/redux/utils/gameUtils"
import { games, gamesStatus } from "@/redux/features/gameSlice"
import { STATUS } from "@/utils/status"
import Heading from "@/components/Heading"
import Spinner from "@/components/Spinner"
import GamesList from "./GamesList"
// types
import { AppDispatch } from "@/redux/store"

export default function PopularGames() {
	const dispatch = useDispatch<AppDispatch>()
	const allGames = useSelector(games)
	const allGamesStatus = useSelector(gamesStatus)

	useEffect(() => {
		dispatch(fetchGames(1))
	}, [dispatch])

	return (
		<section className="flex flex-col items-center min-h-screen w-full max-w-[1240px] mx-auto py-20 px-8">
			<div className="flex flex-col justify-center items-center">
				<Heading heading={{ firstText: "Top popular", secondText: "games" }} />
				{allGamesStatus === STATUS.LOADING ? (
					<div className="mt-10">
						<Spinner />
					</div>
				) : allGames && allGames?.length > 0 ? (
					<GamesList
						games={allGames}
						sliceValue={9}
					/>
				) : (
					<p className="text-3xl font-bold mt-10">Unable to load games!</p>
				)}
			</div>
		</section>
	)
}
