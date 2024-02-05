import Image from "next/image"
import Link from "next/link"
import ErrorDisplay from "../ErrorDisplay"
import Spinner from "../loading/Spinner"
import { useGetSearchedGameQuery } from "@/redux/features/gamesApiSlice"

type SearchedGamesListProps = {
	searchInput: string
	handleLinkClick: () => void
}

export default function SearchedGamesList({
	searchInput,
	handleLinkClick
}: SearchedGamesListProps) {
	const {
		data: searchedGameData,
		isLoading: isGameDataLoading,
		isFetching: isGameDataFetching,
		isError: isGameDataError
	} = useGetSearchedGameQuery(searchInput)

	return (
		<>
			<div className="flex justify-center items-center">
				{(isGameDataLoading || isGameDataFetching) && <Spinner />}
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
			{isGameDataError && <ErrorDisplay errorMessage="Unable to load games." />}
		</>
	)
}
