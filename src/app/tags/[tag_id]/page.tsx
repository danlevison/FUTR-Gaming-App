"use client"

import Banner from "@/components/Banner"
import {
	useGetTagQuery,
	useGetAllTagGamesQuery
} from "@/redux/features/gamesApiSlice"
import { useParams } from "next/navigation"
import GamesList from "@/components/GamesList"
import Pagination from "@/components/Pagnination"
import LoadingGames from "@/components/loading/LoadingGames"
import SkeletonBanner from "@/components/skeletons/SkeletonBanner"
import { useQueryState, parseAsInteger } from "next-usequerystate"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Tag() {
	const { tag_id } = useParams()
	const [pageQuery, setPageQuery] = useQueryState(
		"page",
		parseAsInteger.withDefault(1)
	)
	const {
		data: tagData,
		isLoading: isTagDataLoading,
		isFetching: isTagDataFetching,
		isError: isTagDataError
	} = useGetTagQuery(tag_id as string)

	const {
		data: tagGamesData,
		isLoading,
		isFetching,
		isError
	} = useGetAllTagGamesQuery({
		page: pageQuery,
		slug: tag_id as string
	})

	const pageHandler = (pageValue: number) => {
		setPageQuery(pageValue)

		window.scrollTo({
			top: 0,
			behavior: "instant"
		})
	}

	return (
		<main className="flex flex-col w-full px-5 pt-20 pb-10 md:pt-2">
			{(isTagDataLoading || isTagDataFetching) && <SkeletonBanner />}
			{tagData && <Banner data={tagData} />}
			{isTagDataError && (
				<ErrorDisplay errorMessage="Sorry, something went wrong." />
			)}
			<div className="mt-7 w-full">
				{(isLoading || isFetching) && <LoadingGames />}
				{tagGamesData && tagGamesData.results?.length > 0 && (
					<div className="flex flex-col items-center gap-10">
						<GamesList games={tagGamesData.results} />
						<Pagination
							pageHandler={pageHandler}
							nextPage={tagGamesData.next}
							prevPage={tagGamesData.previous}
							currentPage={pageQuery}
							count={tagGamesData.count}
						/>
					</div>
				)}
				{isError && <ErrorDisplay errorMessage="Unable to load games." />}
			</div>
		</main>
	)
}
