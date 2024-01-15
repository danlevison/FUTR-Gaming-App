"use client"

import { useGetAllTagsQuery } from "@/redux/features/gamesApiSlice"
import PageItemList from "@/components/PageItemList"
import LoadingItems from "@/components/loading/LoadingItems"
import PageHeading from "@/components/PageHeading"

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

			{isError && (
				<p className="text-3xl font-bold text-center">Unable to load tags.</p>
			)}
		</main>
	)
}
