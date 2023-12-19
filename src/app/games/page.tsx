"use client"

import { useGetAllGamesQuery } from "@/redux/features/apiSlice"
import Heading from "@/components/Heading"
import Spinner from "@/components/Spinner"
import GamesList from "@/components/home/GamesList"
import GameCategoryMenu from "./components/GameCategoryMenu"
import Pagination from "@/components/Pagnination"
import { useQueryState, parseAsInteger } from "next-usequerystate"

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

	const [pageQuery, setPageQuery] = useQueryState(
		"page",
		parseAsInteger.withDefault(1)
	)
	const [categoryQuery, setCategoryQuery] = useQueryState(
		"category",
		parseAsInteger.withDefault(0)
	)

	const {
		data: allGamesData,
		isLoading,
		isError
	} = useGetAllGamesQuery({
		urlEndpoint: endPoints[categoryQuery]?.path,
		page: pageQuery
	})

	const handleGameCategory = (index: number) => {
		setCategoryQuery(index)
		setPageQuery(1)
	}

	const pageHandler = (pageValue: number) => {
		setCategoryQuery(categoryQuery)
		setPageQuery(pageValue)

		window.scrollTo({
			top: 0,
			behavior: "instant"
		})
	}

	return (
		<section className="flex flex-col items-center min-h-screen w-full mx-auto px-8 py-28">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Games
			</h1>
			<GameCategoryMenu
				endPoints={endPoints}
				categoryQuery={categoryQuery}
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
							currentPage={pageQuery}
						/>
					</>
				)}
				{isError && <p className="text-3xl font-bold">Unable to load games.</p>}
			</div>
		</section>
	)
}
