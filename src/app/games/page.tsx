"use client"

import { useGetAllGamesQuery } from "@/redux/features/apiSlice"
import LoadingGames from "@/components/LoadingGames"
import GamesList from "@/components/home/GamesList"
import GameCategoryMenu from "./components/GameCategoryMenu"
import Pagination from "@/components/Pagnination"
import {
	useQueryState,
	parseAsInteger,
	parseAsString
} from "next-usequerystate"
import OrderByMenu from "./components/OrderByMenu"

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
	const [optionQuery, setOptionQuery] = useQueryState(
		"order-by",
		parseAsString.withDefault("relevance")
	)
	const options = [
		"relevance",
		"name",
		"released",
		"added",
		"created",
		"updated",
		"rating",
		"metacritic"
	]
	const {
		data: allGamesData,
		isLoading,
		isError,
		isFetching
	} = useGetAllGamesQuery({
		urlEndpoint: endPoints[categoryQuery]?.path,
		option: optionQuery,
		page: pageQuery
	})

	const handleGameCategory = (index: number) => {
		setCategoryQuery(index)
		setPageQuery(1)
	}

	const handleOption = (opt: string) => {
		setOptionQuery(opt)
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
		<main className="min-h-screen w-full mx-auto px-5 py-20">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Games
			</h1>
			<GameCategoryMenu
				endPoints={endPoints}
				categoryQuery={categoryQuery}
				handleGameCategory={handleGameCategory}
			/>
			<OrderByMenu
				options={options}
				optionQuery={optionQuery}
				handleOption={handleOption}
			/>
			<div className="flex flex-col items-center mt-5">
				{(isLoading || isFetching) && <LoadingGames />}

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
		</main>
	)
}
