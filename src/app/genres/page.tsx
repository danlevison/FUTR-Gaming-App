"use client"

import { useGetAllGenresQuery } from "@/redux/features/gamesApiSlice"
import LoadingItems from "@/components/loading/LoadingItems"
import PageItemList from "@/components/PageItemList"
import PageHeading from "@/components/PageHeading"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Genres() {
	const {
		data: allGenresData,
		isLoading,
		isFetching,
		isError
	} = useGetAllGenresQuery({})

	return (
		<main className="w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<PageHeading headingText="Genre" />
			<div className="flex justify-center">
				{(isLoading || isFetching) && <LoadingItems />}
			</div>

			{allGenresData && allGenresData.results?.length > 0 && (
				<PageItemList data={allGenresData.results} />
			)}

			{isError && <ErrorDisplay errorMessage="Unable to load genres." />}
		</main>
	)
}
