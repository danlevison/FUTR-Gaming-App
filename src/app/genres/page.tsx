"use client"

import { useGetAllGenresQuery } from "@/redux/features/gamesApiSlice"
import LoadingItems from "@/components/loading/LoadingItems"
import PageItemList from "@/components/PageItemList"

export default function Genres() {
	const {
		data: allGenresData,
		isLoading,
		isFetching,
		isError
	} = useGetAllGenresQuery({})

	return (
		<main className="min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Genres
			</h1>
			<div className="flex justify-center">
				{(isLoading || isFetching) && <LoadingItems />}
			</div>

			{allGenresData && allGenresData.results?.length > 0 && (
				<PageItemList data={allGenresData.results} />
			)}

			{isError && (
				<p className="text-3xl font-bold text-center">Unable to load genres.</p>
			)}
		</main>
	)
}
