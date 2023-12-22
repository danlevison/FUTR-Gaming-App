"use client"

import { useGetAllTagsQuery } from "@/redux/features/apiSlice"
import PageItemList from "@/components/PageItemList"
import LoadingItems from "@/components/loading/LoadingItems"

export default function Tags() {
	const {
		data: allTagsData,
		isLoading,
		isFetching,
		isError
	} = useGetAllTagsQuery({})

	return (
		<main className="min-h-screen w-full mx-auto px-5 py-20">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Tags
			</h1>
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
