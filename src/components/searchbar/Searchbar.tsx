"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import SearchForm from "./SearchForm"
import SearchedGamesList from "./SearchedGamesList"
import SearchedUsersList from "./SearchedUsersList"
import SearchedCollectionsList from "./SearchedCollectionsList"

export default function Searchbar() {
	const [searchInput, setSearchInput] = useState("")
	const [value] = useDebounce(searchInput, 600)
	const [showResults, setShowResults] = useState(false)

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

						<SearchedGamesList
							searchInput={searchInput}
							handleLinkClick={handleLinkClick}
						/>

						<SearchedUsersList
							searchInput={searchInput}
							handleLinkClick={handleLinkClick}
						/>

						<SearchedCollectionsList
							searchInput={searchInput}
							handleLinkClick={handleLinkClick}
						/>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}
