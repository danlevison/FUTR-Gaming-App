import GamesList from "@/components/GamesList"
import { useGetGameSeriesQuery } from "@/redux/features/gamesApiSlice"
import LoadingGames from "@/components/loading/LoadingGames"
import { GameT } from "@/types"

export default function Series({ gameData }: { gameData: GameT }) {
	const {
		data: gameSeries,
		isLoading,
		isFetching,
		isError
	} = useGetGameSeriesQuery({ id: gameData.id })

	return (
		gameSeries &&
		gameSeries.count !== 0 && (
			<section className="mt-10">
				<h2 className="text-3xl font-bold mb-2">Game Series</h2>
				<>
					{(isLoading || isFetching) && <LoadingGames />}
					<GamesList games={gameSeries?.results} />
					{isError && (
						<p className="text-3xl font-bold">Unable to load games.</p>
					)}
				</>
			</section>
		)
	)
}
