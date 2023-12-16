import { GameT } from "@/types"
import GameCard from "./GameCard"

type GamesListT = {
	games: GameT[]
	sliceValue?: number
}

export default function GamesList({
	games,
	sliceValue = games.length
}: GamesListT) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
			{games?.slice(0, sliceValue).map((game) => (
				<GameCard
					key={game.id}
					game={game}
				/>
			))}
		</div>
	)
}
