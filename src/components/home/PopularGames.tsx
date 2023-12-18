"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGamesOfTheYear } from "@/redux/utils/gameOTYUtils"
import { gamesOTY, gamesOTYStatus } from "@/redux/features/gameOTYSlice"
import { STATUS } from "@/utils/status"
import Heading from "@/components/Heading"
import Spinner from "@/components/Spinner"
import GamesList from "./GamesList"
// types
import { AppDispatch } from "@/redux/store"
import Link from "next/link"

export default function PopularGames() {
	const dispatch = useDispatch<AppDispatch>()
	const allGames = useSelector(gamesOTY)
	const allGamesStatus = useSelector(gamesOTYStatus)

	useEffect(() => {
		dispatch(fetchGamesOfTheYear(1))
	}, [dispatch])

	return (
		<section className="flex flex-col items-center min-h-screen w-full mx-auto py-20 px-8">
			<div className="flex flex-col justify-center items-center">
				<Heading heading={{ firstText: "Games of the", secondText: "year" }} />
				{allGamesStatus === STATUS.LOADING ? (
					<div className="mt-10">
						<Spinner />
					</div>
				) : allGames && allGames?.length > 0 ? (
					<>
						<GamesList games={allGames} />
						<Link href={"/games"}>See more</Link>
					</>
				) : (
					<p className="text-3xl font-bold mt-10">Unable to load games!</p>
				)}
			</div>
		</section>
	)
}
