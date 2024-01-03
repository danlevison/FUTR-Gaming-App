"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import Image from "next/image"
import Link from "next/link"
import { useGetSearchedGameQuery } from "@/redux/features/gamesApiSlice"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import Spinner from "../loading/Spinner"
import SearchForm from "./SearchForm"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import { useFetchPublicCollectionsQuery } from "@/redux/features/collectionsApiSlice"

export default function Searchbar() {
	const user = useSelector(currentUser)
	const [searchInput, setSearchInput] = useState("")
	const [value] = useDebounce(searchInput, 700)
	const [showResults, setShowResults] = useState(false)
	const {
		data: searchedGameData,
		isLoading,
		isFetching,
		isError
	} = useGetSearchedGameQuery(searchInput)
	const { data: publicCollectionsData } = useFetchPublicCollectionsQuery({})
	const { data: userData } = useFetchUsersQuery({})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
		setShowResults(true)
	}

	const handleLinkClick = () => {
		setShowResults(false)
		setSearchInput("")
	}

	const filteredUsers = userData?.filter((user) =>
		user?.displayName.toLowerCase().includes(searchInput)
	)

	const filteredCollections = publicCollectionsData?.filter((collection) =>
		collection.title.toLowerCase().includes(searchInput)
	)

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
						<div className="mt-5 border-b-2 pb-5">
							<h3 className="font-bold text-2xl">Games</h3>
							{searchedGameData && searchedGameData.count === 0 ? (
								<p>No games found!</p>
							) : (
								<ul className="flex flex-col gap-3 mt-4">
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

						<div className="mt-5 border-b-[0.5px] pb-5">
							<h3 className="font-bold text-2xl">Users</h3>
							{userData && filteredUsers?.length === 0 ? (
								<p>No users found!</p>
							) : (
								<ul className="flex flex-col gap-3 mt-4">
									{userData &&
										filteredUsers?.map((user) => (
											<li
												key={user?.uid}
												className="flex items-center gap-2"
											>
												{user?.avatar && (
													<Image
														src={user?.avatar}
														alt={user?.displayName}
														width={50}
														height={50}
														style={{ objectFit: "cover" }}
														className="rounded-md"
													/>
												)}
												<Link
													href={`/user/${user?.uid}`}
													onClick={handleLinkClick}
													className="font-bold md:text-lg hover:underline"
												>
													{user?.displayName}
												</Link>
											</li>
										))}
								</ul>
							)}
						</div>

						<div className="mt-5 border-b-[0.5px] pb-5">
							<h3 className="font-bold text-2xl">Collections</h3>
							{filteredCollections && filteredCollections.length === 0 ? (
								<p>No collections found!</p>
							) : (
								<ul className="flex flex-col gap-3 mt-4">
									{filteredCollections?.map((collection) => (
										<li
											key={collection.id}
											className="flex items-center gap-2"
										>
											{/* {user?.avatar && (
													<Image
														src={user?.avatar}
														alt={user?.displayName}
														width={50}
														height={50}
														style={{ objectFit: "cover" }}
														className="rounded-md"
													/>
												)} */}
											<Link
												href={`/collections/${collection.id}`}
												onClick={handleLinkClick}
												className="font-bold md:text-lg hover:underline"
											>
												{collection.title}
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
