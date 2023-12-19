"use client"

import { useGetAllPublishersQuery } from "@/redux/features/apiSlice"
import { useQueryState, parseAsInteger } from "next-usequerystate"
import PageItemList from "@/components/PageItemList"
import Spinner from "@/components/Spinner"
import Pagination from "@/components/Pagnination"

export default function Stores() {
	const [pageQuery, setPageQuery] = useQueryState(
		"page",
		parseAsInteger.withDefault(1)
	)
	const {
		data: allPublishersData,
		isLoading,
		isFetching,
		isError
	} = useGetAllPublishersQuery({ page: pageQuery })

	const pageHandler = (pageValue: number) => {
		setPageQuery(pageValue)

		window.scrollTo({
			top: 0,
			behavior: "instant"
		})
	}

	return (
		<main className="min-h-screen w-full mx-auto px-8 py-20">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Publishers
			</h1>
			<div className="flex justify-center">
				{(isLoading || isFetching) && <Spinner />}
			</div>

			{allPublishersData && allPublishersData.results?.length > 0 && (
				<>
					<PageItemList data={allPublishersData.results} />
					<div className="flex flex-col items-center justify-center">
						<Pagination
							pageHandler={pageHandler}
							nextPage={allPublishersData.next}
							prevPage={allPublishersData.previous}
							currentPage={pageQuery}
						/>
					</div>
				</>
			)}

			{isError && (
				<p className="text-3xl font-bold text-center">
					Unable to load publishers.
				</p>
			)}
		</main>
	)
}