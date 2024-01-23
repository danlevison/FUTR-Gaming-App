"use client"

import { useGetAllTagsQuery } from "@/redux/features/gamesApiSlice"
import PageItemList from "@/components/PageItemList"
import LoadingItems from "@/components/loading/LoadingItems"
import PageHeading from "@/components/PageHeading"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Tags() {
	const {
		data: allTagsData,
		isLoading,
		isFetching,
		isError
	} = useGetAllTagsQuery({})

	return (
		<main className="w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<PageHeading headingText="Tags" />
			<div className="flex justify-center">
				{(isLoading || isFetching) && <LoadingItems />}
			</div>

			{allTagsData && allTagsData.results?.length > 0 && (
				<PageItemList data={allTagsData.results} />
			)}

			{isError && <ErrorDisplay errorMessage="Unable to load tags." />}
		</main>
	)
}
