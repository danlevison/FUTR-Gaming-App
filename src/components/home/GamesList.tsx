import { GameT } from "@/types"
import GameCard from "./GameCard"

type GamesListT = {
	games: GameT[]
	sliceValue?: number
}

export default function GamesList({ games }: GamesListT) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5">
			{games?.map((game) => (
				<GameCard
					key={game.id}
					game={game}
				/>
			))}
		</div>
	)
}
