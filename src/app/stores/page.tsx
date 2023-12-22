"use client"

import { useGetAllStoresQuery } from "@/redux/features/apiSlice"
import PageItemList from "@/components/PageItemList"
import LoadingItems from "@/components/loading/LoadingItems"
import SkeletonItemCard from "@/components/SkeletonItemCard"

export default function Stores() {
	const {
		data: allStoresData,
		isLoading,
		isFetching,
		isError
	} = useGetAllStoresQuery({})

	return (
		<main className="min-h-screen w-full mx-auto px-5 py-20">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Stores
			</h1>
			<div className="flex justify-center">
				{(isLoading || isFetching) && <LoadingItems />}
			</div>

			{allStoresData && allStoresData.results?.length > 0 && (
				<PageItemList data={allStoresData.results} />
			)}

			{isError && (
				<p className="text-3xl font-bold text-center">Unable to load stores.</p>
			)}
		</main>
	)
}
