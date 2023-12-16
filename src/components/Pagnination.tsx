import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

type PaginationT = {
	pageHandler: (pageValue: number) => void
	nextPage: string | null
	prevPage: string | null
	currentPage: number
}

export default function Pagination({
	pageHandler,
	nextPage,
	prevPage,
	currentPage
}: PaginationT) {
	const pageNextHandler = () => {
		if (nextPage !== null) pageHandler(++currentPage)
	}

	const pagePrevHandler = () => {
		if (prevPage !== null) pageHandler(--currentPage)
	}
	return (
		<div className="flex items-center gap-4 mt-10">
			<button
				type="button"
				className="flex items-center gap-2 text-lg sm:text-xl uppercase font-bold disabled:text-gray-400"
				disabled={prevPage === null ? true : false}
				onClick={pagePrevHandler}
			>
				<AiOutlineArrowLeft /> Prev
			</button>
			<button
				type="button"
				className="flex items-center gap-2 text-lg sm:text-xl uppercase font-bold disabled:text-gray-400"
				disabled={nextPage === null ? true : false}
				onClick={pageNextHandler}
			>
				Next <AiOutlineArrowRight />
			</button>
		</div>
	)
}
