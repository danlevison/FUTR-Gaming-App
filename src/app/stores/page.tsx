"use client"

import { useGetAllStoresQuery } from "@/redux/features/gamesApiSlice"
import PageItemList from "@/components/PageItemList"
import LoadingItems from "@/components/loading/LoadingItems"
import PageHeading from "@/components/PageHeading"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function Stores() {
	const {
		data: allStoresData,
		isLoading,
		isFetching,
		isError
	} = useGetAllStoresQuery({})

	return (
		<main className="w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<PageHeading headingText="Stores" />
			<div className="flex justify-center">
				{(isLoading || isFetching) && <LoadingItems />}
			</div>

			{allStoresData && allStoresData.results?.length > 0 && (
				<PageItemList data={allStoresData.results} />
			)}

			{isError && <ErrorDisplay errorMessage="Unable to load stores." />}
		</main>
	)
}
