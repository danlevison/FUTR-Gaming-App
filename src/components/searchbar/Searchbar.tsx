"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import Image from "next/image"
import Link from "next/link"
import { useGetSearchedGameQuery } from "@/redux/features/gamesApiSlice"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import Spinner from "../loading/Spinner"
import SearchForm from "./SearchForm"

export default function Searchbar() {
	const [searchInput, setSearchInput] = useState("")
	const [value] = useDebounce(searchInput, 700)
	const [showResults, setShowResults] = useState(false)
	const {
		data: searchedGameData,
		isLoading,
		isFetching,
		isError
	} = useGetSearchedGameQuery(searchInput)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
		setShowResults(true)
	}

	const handleLinkClick = () => {
		setShowResults(false)
		setSearchInput("")
	}

	return (
		<>
			<SearchForm
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				handleSearch={handleSearch}
			/>
			{showResults && value && (
				<Dialog
					open={showResults}
					onOpenChange={setShowResults}
				>
					<DialogContent className="block max-w-full h-full border-none overflow-auto">
						<DialogHeader className="mt-2">
							<SearchForm
								searchInput={searchInput}
								setSearchInput={setSearchInput}
								handleSearch={handleSearch}
								showResults={showResults}
							/>
						</DialogHeader>
						<div className="flex justify-center items-center">
							{(isLoading || isFetching) && <Spinner />}
						</div>
						<div className="mt-5">
							{searchedGameData && searchedGameData.count === 0 ? (
								<p>No games found!</p>
							) : (
								<ul className="flex flex-col gap-3">
									{searchedGameData &&
										searchedGameData.results.slice(0, 7).map((game) => (
											<li
												key={game.id}
												className="flex items-center gap-2"
											>
												{game.background_image && (
													<Image
														src={game.background_image}
														alt={game.name}
														width={70}
														height={70}
														style={{ objectFit: "cover" }}
														className="rounded-md"
													/>
												)}
												<Link
													href={`/games/${game?.id}`}
													onClick={handleLinkClick}
													className="font-bold md:text-lg hover:underline"
												>
													{game.name}
												</Link>
											</li>
										))}
								</ul>
							)}
						</div>
						{isError && (
							<p className="text-3xl font-bold text-center">
								Unable to load games.
							</p>
						)}
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}
